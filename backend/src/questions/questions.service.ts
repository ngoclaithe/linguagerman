import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.question.create({ data });
  }

  async findByExam(examId: string) {
    return this.prisma.question.findMany({
      where: { examId },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async update(id: string, data: any) {
    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
