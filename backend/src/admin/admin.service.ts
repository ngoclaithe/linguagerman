import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats(user: any) {
    const isTeacher = user.role === 'TEACHER';
    const teacherId = user.sub;

    const where: any = isTeacher ? { teacherId } : {};
    const orderWhere: any = isTeacher
      ? { items: { some: { course: { teacherId } } } }
      : {};

    const userCount = isTeacher
      ? await this.prisma.user.count({
          where: {
            enrollments: { some: { course: { teacherId } as any } },
          } as any,
        })
      : await this.prisma.user.count();

    const courseCount = await this.prisma.course.count({ where });
    const salesCount = await this.prisma.order.count({
      where: {
        status: 'COMPLETED',
        ...orderWhere,
      },
    });

    const recentOrders = await this.prisma.order.findMany({
      where: orderWhere,
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          where: isTeacher ? ({ course: { teacherId } as any } as any) : {},
          include: { course: true },
        },
      } as any,
    });

    return {
      stats: {
        totalUsers: userCount,
        totalCourses: courseCount,
        totalSales: salesCount,
      },
      recentOrders,
    };
  }

  async getAllUsers(user: any) {
    const isTeacher = user.role === 'TEACHER';
    const teacherId = user.sub || user.id;

    return this.prisma.user.findMany({
      where: {
        role: 'STUDENT' as any,
        ...(isTeacher
          ? { enrollments: { some: { course: { teacherId } as any } } }
          : {}),
      } as any,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        enrollments: {
          where: isTeacher ? { course: { teacherId } as any } : {},
          select: {
            course: {
              select: { title: true },
            },
          },
        },
        _count: {
          select: {
            enrollments: isTeacher
              ? {
                  where: { course: { teacherId } as any },
                }
              : true,
          },
        },
      } as any,
    });
  }

  async getTeachers(user: any) {
    const isTeacher = user.role === 'TEACHER';
    const teacherId = user.sub;

    return this.prisma.user.findMany({
      where: {
        role: 'TEACHER' as any,
        ...(isTeacher ? { id: teacherId } : {}),
      } as any,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        slug: true,
        bio: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            courses: true,
          } as any,
        },
      } as any,
    });
  }
}
