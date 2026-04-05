import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getUserProgress(userId: string) {
    const completedLessons = await this.prisma.lessonProgress.findMany({
      where: { userId, completed: true },
      include: { lesson: { include: { course: true } } },
    });

    const examHistory = await this.prisma.examResult.findMany({
      where: { userId },
      include: { exam: true },
      orderBy: { submittedAt: 'desc' },
    });

    return {
      completedLessons,
      completedCount: completedLessons.length,
      examHistory,
    };
  }

  async markLessonComplete(userId: string, lessonId: string) {
    return this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { completed: true, completedAt: new Date() },
      create: { userId, lessonId, completed: true, completedAt: new Date() },
    });
  }

  async getMyCourses(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            lessons: true,
          },
        },
      },
    });
  }
}
