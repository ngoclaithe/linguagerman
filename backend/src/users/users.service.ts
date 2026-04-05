import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(skip = 0, take = 10) {
    return this.prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const data = { ...updateUserDto };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: data as any,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        bio: true,
      } as any,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findAllTeachers() {
    return this.prisma.user.findMany({
      where: { role: 'TEACHER' } as any,
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        slug: true,
        _count: {
          select: { courses: true },
        },
      } as any,
    });
  }

  async findTeacherBySlug(slug: string) {
    return this.prisma.user.findUnique({
      where: { slug } as any,
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
        slug: true,
        courses: {
          select: {
            id: true,
            title: true,
            level: true,
            price: true,
            thumbnail: true,
            enrollments: true,
          },
        },
      } as any,
    });
  }
}
