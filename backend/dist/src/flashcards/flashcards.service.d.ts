import { PrismaService } from '../prisma/prisma.service';
export declare class FlashcardsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import("@prisma/client").$Enums.CourseLevel;
        word: string;
        meaning: string;
        example: string | null;
        article: string;
    }>;
    findAll(userId?: string): Promise<({
        users: {
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import("@prisma/client").$Enums.CourseLevel;
        word: string;
        meaning: string;
        example: string | null;
        article: string;
    })[]>;
    toggleMyList(userId: string, flashcardId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        flashcardId: string;
    }>;
    getMyList(userId: string): Promise<({
        flashcard: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: import("@prisma/client").$Enums.CourseLevel;
            word: string;
            meaning: string;
            example: string | null;
            article: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        flashcardId: string;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import("@prisma/client").$Enums.CourseLevel;
        word: string;
        meaning: string;
        example: string | null;
        article: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import("@prisma/client").$Enums.CourseLevel;
        word: string;
        meaning: string;
        example: string | null;
        article: string;
    }>;
    getMyProgress(userId: string): Promise<({
        flashcard: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: import("@prisma/client").$Enums.CourseLevel;
            word: string;
            meaning: string;
            example: string | null;
            article: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        flashcardId: string;
        known: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
    })[]>;
    updateProgress(userId: string, flashcardId: string, known: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        flashcardId: string;
        known: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import("@prisma/client").$Enums.CourseLevel;
        word: string;
        meaning: string;
        example: string | null;
        article: string;
    }>;
}
