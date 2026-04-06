import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  private slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .trim()
      .replace(/\s+/g, '-') 
      .replace(/[^\w-]+/g, '') 
      .replace(/--+/g, '-'); 
  }

  async create(data: any, user: any) {
    if (!data.slug && data.title) {
      data.slug = this.slugify(data.title);
    }

    
    if (user.role === 'TEACHER') {
      data.teacherId = user.sub;
    }

    return this.prisma.course.create({
      data,
      include: {
        lessons: true,
      },
    });
  }

  async findAll(skip = 0, take = 10, user?: any) {
    const isTeacher = user?.role === 'TEACHER';
    const where = isTeacher ? { teacherId: user.sub || user.id } : {};

    return this.prisma.course.findMany({
      where,
      skip,
      take,
      include: {
        teacher: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        lessons: {
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
      } as any,
    } as any);
  }

  async findOne(idOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, data: any, user: any) {
    if (user.role === 'TEACHER') {
      const course = await this.prisma.course.findUnique({ where: { id } });
      if (!course || (course as any).teacherId !== user.sub) {
        throw new Error('Unauthorized to update this course');
      }
      
      delete data.teacherId;
    }

    if (!data.slug && data.title) {
      data.slug = this.slugify(data.title);
    }
    return this.prisma.course.update({
      where: { id },
      data,
      include: {
        lessons: true,
      },
    });
  }

  async remove(id: string, user: any) {
    if (user.role === 'TEACHER') {
      const course = await this.prisma.course.findUnique({ where: { id } });
      if (!course || (course as any).teacherId !== user.sub) {
        throw new Error('Unauthorized to delete this course');
      }
    }
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
