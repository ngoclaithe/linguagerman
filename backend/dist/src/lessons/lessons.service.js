"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const streaming_service_1 = require("../streaming/streaming.service");
const path = __importStar(require("path"));
let LessonsService = class LessonsService {
    prisma;
    streamingService;
    constructor(prisma, streamingService) {
        this.prisma = prisma;
        this.streamingService = streamingService;
    }
    async create(data) {
        const { videos, files, ...lessonData } = data;
        const lesson = await this.prisma.lesson.create({
            data: {
                ...lessonData,
                videos: videos ? { create: videos } : undefined,
                files: files ? { create: files } : undefined,
            },
            include: { videos: true, files: true },
        });
        this.triggerHlsConversion(lesson);
        return lesson;
    }
    async findByCourse(courseIdOrSlug) {
        const course = await this.prisma.course.findFirst({
            where: {
                OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
            },
        });
        if (!course)
            return [];
        const lessons = await this.prisma.lesson.findMany({
            where: { courseId: course.id },
            include: {
                videos: { orderBy: { order: 'asc' } },
                files: { orderBy: { order: 'asc' } },
            },
            orderBy: { order: 'asc' },
        });
        return lessons.map((lesson) => ({
            ...lesson,
            videos: lesson.videos.map((video) => ({
                ...video,
                signedUrlParams: this.streamingService.generateSignedUrl(video.id),
            })),
        }));
    }
    async findOne(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: {
                videos: { orderBy: { order: 'asc' } },
                files: { orderBy: { order: 'asc' } },
            },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        return {
            ...lesson,
            videos: lesson.videos.map((video) => ({
                ...video,
                signedUrlParams: this.streamingService.generateSignedUrl(video.id),
            })),
        };
    }
    async update(id, data) {
        const { videos, files, ...lessonData } = data;
        return this.prisma.$transaction(async (tx) => {
            const existingLesson = await tx.lesson.findUnique({
                where: { id },
                include: { videos: true, files: true },
            });
            if (!existingLesson)
                throw new common_1.NotFoundException('Lesson not found');
            if (videos) {
                for (const video of existingLesson.videos) {
                    await this.streamingService.deleteHlsResults(video.id);
                    this.streamingService.deleteFile(video.videoUrl);
                }
                await tx.lessonVideo.deleteMany({ where: { lessonId: id } });
            }
            if (files) {
                for (const file of existingLesson.files) {
                    this.streamingService.deleteFile(file.fileUrl);
                }
                await tx.lessonFile.deleteMany({ where: { lessonId: id } });
            }
            if (existingLesson.videoUrl &&
                data.videoUrl &&
                existingLesson.videoUrl !== data.videoUrl) {
                this.streamingService.deleteFile(existingLesson.videoUrl);
            }
            if (existingLesson.fileUrl &&
                data.fileUrl &&
                existingLesson.fileUrl !== data.fileUrl) {
                this.streamingService.deleteFile(existingLesson.fileUrl);
            }
            const updatedLesson = await tx.lesson.update({
                where: { id },
                data: {
                    ...lessonData,
                    videos: videos ? { create: videos } : undefined,
                    files: files ? { create: files } : undefined,
                },
                include: { videos: true, files: true },
            });
            this.triggerHlsConversion(updatedLesson);
            return updatedLesson;
        });
    }
    triggerHlsConversion(lesson) {
        if (!lesson.videos || lesson.videos.length === 0)
            return;
        lesson.videos.forEach(async (video) => {
            if (!video.videoUrl)
                return;
            let fullPath;
            if (video.videoUrl.startsWith('/uploads')) {
                fullPath = path.join(process.cwd(), 'public', video.videoUrl);
            }
            else {
                fullPath = path.join(process.cwd(), video.videoUrl);
            }
            this.streamingService.convertToHls(video.id, fullPath).catch((err) => {
                console.error(`[LessonsService] HLS Conversion failed for video ${video.id}:`, err);
            });
        });
    }
    async remove(id) {
        const lesson = await this.prisma.lesson.findUnique({
            where: { id },
            include: { videos: true, files: true },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (lesson.videoUrl)
            this.streamingService.deleteFile(lesson.videoUrl);
        if (lesson.fileUrl)
            this.streamingService.deleteFile(lesson.fileUrl);
        for (const video of lesson.videos) {
            await this.streamingService.deleteHlsResults(video.id);
            this.streamingService.deleteFile(video.videoUrl);
        }
        for (const file of lesson.files) {
            this.streamingService.deleteFile(file.fileUrl);
        }
        return this.prisma.lesson.delete({
            where: { id },
        });
    }
};
exports.LessonsService = LessonsService;
exports.LessonsService = LessonsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        streaming_service_1.StreamingService])
], LessonsService);
//# sourceMappingURL=lessons.service.js.map