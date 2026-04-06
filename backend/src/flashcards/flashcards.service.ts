import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlashcardsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.flashcard.create({ data });
  }

  async findAll(userId?: string) {
    
    return this.prisma.flashcard.findMany({
      include: {
        users: userId
          ? {
              where: { userId },
            }
          : false,
      },
    });
  }

  async toggleMyList(userId: string, flashcardId: string) {
    const existing = await this.prisma.userFlashcard.findUnique({
      where: { userId_flashcardId: { userId, flashcardId } },
    });

    if (existing) {
      return this.prisma.userFlashcard.delete({
        where: { id: existing.id },
      });
    }

    return this.prisma.userFlashcard.create({
      data: { userId, flashcardId },
    });
  }

  async getMyList(userId: string) {
    return this.prisma.userFlashcard.findMany({
      where: { userId },
      include: { flashcard: true },
    });
  }

  async findOne(id: string) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { id },
    });
    if (!flashcard) throw new NotFoundException('Flashcard not found');
    return flashcard;
  }

  async update(id: string, data: any) {
    return this.prisma.flashcard.update({
      where: { id },
      data,
    });
  }

  async getMyProgress(userId: string) {
    return this.prisma.flashcardProgress.findMany({
      where: { userId },
      include: { flashcard: true },
    });
  }

  async updateProgress(userId: string, flashcardId: string, known: boolean) {
    return this.prisma.flashcardProgress.upsert({
      where: { userId_flashcardId: { userId, flashcardId } },
      create: {
        userId,
        flashcardId,
        known,
        reviewCount: 1,
        lastReviewedAt: new Date(),
      },
      update: {
        known,
        reviewCount: { increment: 1 },
        lastReviewedAt: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.flashcard.delete({
      where: { id },
    });
  }
}
