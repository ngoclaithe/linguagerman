import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, courseIds: string[]) {
    
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
    });

    const totalPrice = courses.reduce((sum, course) => sum + course.price, 0);

    return this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        status: 'PENDING',
        items: {
          create: courses.map((course) => ({
            courseId: course.id,
            price: course.price,
          })),
        },
      },
      include: { items: true },
    });
  }

  async getMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { course: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders(user: any) {
    const isTeacher = user.role === 'TEACHER';
    const teacherId = user.sub;

    const where: any = isTeacher
      ? { items: { some: { course: { teacherId } } } }
      : {};

    return this.prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: {
          where: isTeacher ? ({ course: { teacherId } as any } as any) : {},
          include: { course: true },
        },
      } as any,
      orderBy: { createdAt: 'desc' },
    });
  }

  async completeOrder(orderId: string) {
    const orderExists = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!orderExists) {
      throw new Error('Order not found');
    }

    if (orderExists.status === 'COMPLETED') {
      return orderExists;
    }

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status: 'COMPLETED' },
        include: { items: true },
      });

      
      await Promise.all(
        order.items.map((item) =>
          tx.enrollment.upsert({
            where: {
              userId_courseId: {
                userId: order.userId,
                courseId: item.courseId,
              },
            },
            update: {}, 
            create: {
              userId: order.userId,
              courseId: item.courseId,
              progress: 0,
            },
          }),
        ),
      );

      return order;
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, user: any) {
    const isTeacher = user.role === 'TEACHER';
    if (isTeacher) {
      
      const order = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          items: { some: { course: { teacherId: user.sub } } },
        } as any,
      });
      if (!order) {
        throw new Error('Unauthorized to update this order');
      }
    }

    if (status === OrderStatus.COMPLETED) {
      return this.completeOrder(orderId);
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async removeOrder(orderId: string) {
    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}
