import { PrismaService } from '../prisma/prisma.service';
export declare class ExamsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        questions: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        level: import("@prisma/client").$Enums.CourseLevel;
        courseId: string | null;
        duration: number;
        published: boolean;
    }>;
    findAll(user: any, courseId?: string): Promise<({
        [x: string]: ({
            id: string;
            userId: string;
            examId: string;
            score: number;
            correctCount: number;
            timeSpent: number;
            submittedAt: Date;
        } | {
            id: string;
            userId: string;
            examId: string;
            score: number;
            correctCount: number;
            timeSpent: number;
            submittedAt: Date;
        })[] | {
            id: string;
            userId: string;
            examId: string;
            score: number;
            correctCount: number;
            timeSpent: number;
            submittedAt: Date;
        }[] | {
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
        }[] | ({
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
        } | {
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
        })[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        level: import("@prisma/client").$Enums.CourseLevel;
        courseId: string | null;
        duration: number;
        published: boolean;
    })[]>;
    findOne(id: string): Promise<{
        questions: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        level: import("@prisma/client").$Enums.CourseLevel;
        courseId: string | null;
        duration: number;
        published: boolean;
    }>;
    submit(userId: string, examId: string, answers: Record<string, string>): Promise<{
        id: string;
        userId: string;
        examId: string;
        score: number;
        correctCount: number;
        timeSpent: number;
        submittedAt: Date;
    }>;
    submitResult(userId: string, examId: string, resultData: any): Promise<{
        id: string;
        userId: string;
        examId: string;
        score: number;
        correctCount: number;
        timeSpent: number;
        submittedAt: Date;
    }>;
    getMyResults(userId: string): Promise<({
        exam: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            level: import("@prisma/client").$Enums.CourseLevel;
            courseId: string | null;
            duration: number;
            published: boolean;
        };
    } & {
        id: string;
        userId: string;
        examId: string;
        score: number;
        correctCount: number;
        timeSpent: number;
        submittedAt: Date;
    })[]>;
    update(id: string, data: any): Promise<({
        questions: {
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
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        level: import("@prisma/client").$Enums.CourseLevel;
        courseId: string | null;
        duration: number;
        published: boolean;
    }) | null>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        level: import("@prisma/client").$Enums.CourseLevel;
        courseId: string | null;
        duration: number;
        published: boolean;
    }>;
}
