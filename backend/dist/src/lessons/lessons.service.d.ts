import { PrismaService } from '../prisma/prisma.service';
import { StreamingService } from '../streaming/streaming.service';
export declare class LessonsService {
    private prisma;
    private streamingService;
    constructor(prisma: PrismaService, streamingService: StreamingService);
    create(data: any): Promise<{
        videos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string;
            order: number;
            lessonId: string;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            lessonId: string;
            fileUrl: string;
        }[];
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
    }>;
    findByCourse(courseIdOrSlug: string): Promise<{
        videos: {
            signedUrlParams: {
                signature: string;
                expires: number;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string;
            order: number;
            lessonId: string;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            lessonId: string;
            fileUrl: string;
        }[];
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
            videoUrl: string;
            order: number;
            lessonId: string;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            lessonId: string;
            fileUrl: string;
        }[];
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
    }>;
    update(id: string, data: any): Promise<{
        videos: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            videoUrl: string;
            order: number;
            lessonId: string;
        }[];
        files: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            lessonId: string;
            fileUrl: string;
        }[];
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
    }>;
    private triggerHlsConversion;
    remove(id: string): Promise<{
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
    }>;
}
