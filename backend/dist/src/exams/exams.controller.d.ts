import { ExamsService } from './exams.service';
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    create(data: any): Promise<{
        questions: {
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
    update(id: string, data: any): Promise<({
        questions: {
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
    findAll(req: any, courseId?: string): Promise<({
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
            question: string;
            examId: string;
            type: import("@prisma/client").$Enums.QuestionType;
            audioUrl: string | null;
            options: string[];
            correctAnswer: string;
            explanation: string | null;
        }[] | ({
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
        } | {
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
    getMyResults(req: any): Promise<({
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
    findOne(id: string): Promise<{
        questions: {
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
    submitResult(req: any, examId: string, answers: any): Promise<{
        id: string;
        userId: string;
        examId: string;
        score: number;
        correctCount: number;
        timeSpent: number;
        submittedAt: Date;
    }>;
}
