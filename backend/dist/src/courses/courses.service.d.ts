import { PrismaService } from '../prisma/prisma.service';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    private slugify;
    create(data: any, user: any): Promise<{
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string | null;
            order: number;
            courseId: string;
            content: string | null;
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
    }>;
    findAll(skip?: number, take?: number, user?: any): Promise<{
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
    }[]>;
    findOne(idOrSlug: string): Promise<{
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string | null;
            order: number;
            courseId: string;
            content: string | null;
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
    }>;
    update(id: string, data: any, user: any): Promise<{
        lessons: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string | null;
            order: number;
            courseId: string;
            content: string | null;
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
    }>;
    remove(id: string, user: any): Promise<{
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
    }>;
}
