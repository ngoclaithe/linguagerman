import { PrismaService } from '../prisma/prisma.service';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        question: string;
        examId: string;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
    }>;
    findByExam(examId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        question: string;
        examId: string;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        question: string;
        examId: string;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        question: string;
        examId: string;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        question: string;
        examId: string;
        type: import("@prisma/client").$Enums.QuestionType;
        audioUrl: string | null;
        options: string[];
        correctAnswer: string;
        explanation: string | null;
    }>;
}
