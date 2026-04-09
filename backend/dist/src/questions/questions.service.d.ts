import { PrismaService } from '../prisma/prisma.service';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
    }>;
    findByExam(examId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        examId: string;
        question: string;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
    }>;
}
