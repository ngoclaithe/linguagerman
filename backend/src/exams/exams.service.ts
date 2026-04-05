import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.exam.create({
      data: {
        ...data,
        questions: {
          create: data.questions,
        },
      },
      include: { questions: true },
    });
  }

  async findAll(user: any, courseId?: string) {
    const isAdmin = user.role === 'ADMIN';
    const isTeacher = user.role === 'TEACHER';

    return this.prisma.exam.findMany({
      where: {
        ...(courseId && { courseId }),
        ...(isTeacher &&
          ({
            OR: [
              { courseId: null },
              { course: { teacherId: user.sub || user.id } },
            ],
          } as any)),
        ...(!isAdmin && !isTeacher && { published: true }),
      },
      include: {
        questions: true,
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            results: true,
          },
        },
      } as any,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!exam) throw new NotFoundException('Exam not found');
    return exam;
  }

  async submit(
    userId: string,
    examId: string,
    answers: Record<string, string>,
  ) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) throw new NotFoundException('Exam not found');

    let correctCount = 0;
    exam.questions.forEach((question: any) => {
      const userAnswer = answers[question.id]?.trim() || '';
      const correctAnswer = question.correctAnswer.trim();

      if (question.type === 'FILL') {
        // Case-insensitive comparison for fill-in-the-blank
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
          correctCount++;
        }
      } else {
        // Exact comparison for choice and listening
        if (userAnswer === correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = (correctCount / exam.questions.length) * 100;

    return this.prisma.examResult.create({
      data: {
        userId,
        examId,
        score,
        correctCount,
        timeSpent: 0, // In a real app, you'd track this on the frontend
      },
    });
  }

  async submitResult(userId: string, examId: string, resultData: any) {
    // ... existing method if needed, but 'submit' is the new standard
    return this.prisma.examResult.create({
      data: {
        userId,
        examId,
        score: resultData.score,
        correctCount: resultData.correctCount,
        timeSpent: resultData.timeSpent,
      },
    });
  }

  async getMyResults(userId: string) {
    return this.prisma.examResult.findMany({
      where: { userId },
      include: { exam: true },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async update(id: string, data: any) {
    const { questions, ...examData } = data;

    // Use a transaction to update exam and replace questions
    return this.prisma.$transaction(async (tx) => {
      // Update exam fields
      const updatedExam = await tx.exam.update({
        where: { id },
        data: examData,
      });

      // If questions are provided, delete old ones and create new ones
      if (questions && Array.isArray(questions)) {
        await tx.question.deleteMany({
          where: { examId: id },
        });

        await tx.question.createMany({
          data: questions.map((q: any, idx: number) => ({
            examId: id,
            type: q.type || 'CHOICE',
            question: q.question,
            audioUrl: q.audioUrl || null,
            options: Array.isArray(q.options) ? q.options : [],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || null,
            order: q.order ?? idx + 1,
          })),
        });
      }

      // Return the updated exam with questions
      return tx.exam.findUnique({
        where: { id },
        include: { questions: true },
      });
    });
  }

  async remove(id: string) {
    return this.prisma.exam.delete({
      where: { id },
    });
  }
}
