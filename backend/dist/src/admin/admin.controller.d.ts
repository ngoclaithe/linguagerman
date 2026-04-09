import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getStats(req: any): Promise<{
        stats: {
            totalUsers: number;
            totalCourses: number;
            totalSales: number;
        };
        recentOrders: ({
            [x: string]: {
                id: string;
                createdAt: Date;
                price: number;
                courseId: string;
                orderId: string;
            }[] | ({
                id: string;
                createdAt: Date;
                price: number;
                courseId: string;
                orderId: string;
            } | {
                id: string;
                createdAt: Date;
                price: number;
                courseId: string;
                orderId: string;
            })[];
            [x: number]: never;
            [x: symbol]: never;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        })[];
    }>;
    getUsers(req: any): Promise<{
        [x: string]: ({
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
        } | {
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
        })[] | ({
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        } | {
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        })[] | ({
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
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        })[] | ({
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        } | {
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        })[] | ({
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        } | {
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        })[] | {
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
        }[] | {
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        }[] | {
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
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        }[] | {
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        }[] | {
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    }[]>;
    getTeachers(req: any): Promise<{
        [x: string]: ({
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
        } | {
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
        })[] | ({
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        } | {
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        })[] | ({
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
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        })[] | ({
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        } | {
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        })[] | ({
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        } | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        })[] | ({
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        } | {
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        })[] | {
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
        }[] | {
            id: string;
            updatedAt: Date;
            userId: string;
            courseId: string;
            progress: number;
            enrolledAt: Date;
        }[] | {
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
            userId: string;
            flashcardId: string;
            known: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
        }[] | {
            id: string;
            createdAt: Date;
            userId: string;
            flashcardId: string;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            totalPrice: number;
            status: import("@prisma/client").$Enums.OrderStatus;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            lessonId: string;
            userId: string;
            completed: boolean;
            completedAt: Date | null;
        }[] | {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            questId: string;
            current: number;
            claimed: boolean;
        }[] | {
            id: string;
            userId: string;
            personaId: string;
            topic: string;
            cefrLevel: string;
            startedAt: Date;
            endedAt: Date | null;
            messageCount: number;
        }[];
        [x: number]: never;
        [x: symbol]: never;
    }[]>;
}
