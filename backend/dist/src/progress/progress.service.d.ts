import { PrismaService } from '../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserProgress(userId: string): Promise<{
        completedLessons: ({
            lesson: {
                course: {
                    id: string;
                    slug: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    title: string;
                    description: string | null;
                    level: import("@prisma/client").$Enums.CourseLevel;
                    price: number;
                    thumbnail: string | null;
                    teacherId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                courseId: string;
                videoUrl: string | null;
                content: string | null;
                order: number;
                fileUrl: string | null;
                type: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            lessonId: string;
            completed: boolean;
            completedAt: Date | null;
        })[];
        completedCount: number;
        examHistory: ({
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
        })[];
    }>;
    markLessonComplete(userId: string, lessonId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        lessonId: string;
        completed: boolean;
        completedAt: Date | null;
    }>;
    getMyCourses(userId: string): Promise<({
        course: {
            lessons: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                courseId: string;
                videoUrl: string | null;
                content: string | null;
                order: number;
                fileUrl: string | null;
                type: string;
            }[];
        } & {
            id: string;
            slug: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            level: import("@prisma/client").$Enums.CourseLevel;
            price: number;
            thumbnail: string | null;
            teacherId: string | null;
        };
    } & {
        id: string;
        updatedAt: Date;
        courseId: string;
        userId: string;
        progress: number;
        enrolledAt: Date;
    })[]>;
}
