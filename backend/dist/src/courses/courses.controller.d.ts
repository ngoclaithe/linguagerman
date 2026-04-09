import { CoursesService } from './courses.service';
export declare class CoursesController {
    private coursesService;
    constructor(coursesService: CoursesService);
    findManaged(req: any, skip?: number, take?: number): Promise<{
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
    findAll(skip?: number, take?: number): Promise<{
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
    findOne(id: string): Promise<{
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
    }>;
    create(req: any, createCourseDto: any): Promise<{
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
    }>;
    update(req: any, id: string, updateCourseDto: any): Promise<{
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
    }>;
    remove(req: any, id: string): Promise<{
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
