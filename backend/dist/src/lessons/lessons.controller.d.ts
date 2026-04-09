import { LessonsService } from './lessons.service';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    create(data: any): Promise<{
        videos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            videoUrl: string;
            order: number;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            order: number;
            fileUrl: string;
        }[];
    } & {
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
    }>;
    findByCourse(courseId: string): Promise<{
        videos: {
            signedUrlParams: {
                signature: string;
                expires: number;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            videoUrl: string;
            order: number;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            order: number;
            fileUrl: string;
        }[];
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
    }[]>;
    findOne(id: string): Promise<{
        videos: {
            signedUrlParams: {
                signature: string;
                expires: number;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            videoUrl: string;
            order: number;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            order: number;
            fileUrl: string;
        }[];
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
    }>;
    update(id: string, data: any): Promise<{
        videos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            videoUrl: string;
            order: number;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            lessonId: string;
            order: number;
            fileUrl: string;
        }[];
    } & {
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
