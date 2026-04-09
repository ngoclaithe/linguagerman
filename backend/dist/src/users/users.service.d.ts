import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(skip?: number, take?: number): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        slug: string | null;
        password: string;
        name: string | null;
        avatar: string | null;
        bio: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
        currentLevel: import("@prisma/client").$Enums.CourseLevel;
        xp: number;
        grammarScore: number;
        vocabScore: number;
        speakingScore: number;
    }>;
    findAllTeachers(): Promise<{
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
    findTeacherBySlug(slug: string): Promise<{
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
    } | null>;
}
