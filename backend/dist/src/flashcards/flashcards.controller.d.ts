import { FlashcardsService } from './flashcards.service';
export declare class FlashcardsController {
    private readonly flashcardsService;
    constructor(flashcardsService: FlashcardsService);
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
    toggleMyList(req: any, flashcardId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        flashcardId: string;
    }>;
    getMyList(req: any): Promise<({
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
    getMyProgress(req: any): Promise<({
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
    findAll(): Promise<({
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
    updateProgress(req: any, flashcardId: string, known: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        flashcardId: string;
        known: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
    }>;
}
