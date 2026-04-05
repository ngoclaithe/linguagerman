import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StreamingService } from '../streaming/streaming.service';
import * as path from 'path';

@Injectable()
export class LessonsService {
  constructor(
    private prisma: PrismaService,
    private streamingService: StreamingService,
  ) {}

  async create(data: any) {
    const { videos, files, ...lessonData } = data;
    const lesson = await this.prisma.lesson.create({
      data: {
        ...lessonData,
        videos: videos ? { create: videos } : undefined,
        files: files ? { create: files } : undefined,
      },
      include: { videos: true, files: true },
    });

    // Trigger HLS conversion in background
    this.triggerHlsConversion(lesson);

    return lesson;
  }

  async findByCourse(courseIdOrSlug: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        OR: [{ id: courseIdOrSlug }, { slug: courseIdOrSlug }],
      },
    });

    if (!course) return [];

    const lessons = await this.prisma.lesson.findMany({
      where: { courseId: course.id },
      include: {
        videos: { orderBy: { order: 'asc' } },
        files: { orderBy: { order: 'asc' } },
      },
      orderBy: { order: 'asc' },
    });

    // Sign video URLs
    return lessons.map((lesson) => ({
      ...lesson,
      videos: lesson.videos.map((video) => ({
        ...video,
        signedUrlParams: this.streamingService.generateSignedUrl(video.id),
      })),
    }));
  }

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        videos: { orderBy: { order: 'asc' } },
        files: { orderBy: { order: 'asc' } },
      },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    // Sign video URLs
    return {
      ...lesson,
      videos: lesson.videos.map((video) => ({
        ...video,
        signedUrlParams: this.streamingService.generateSignedUrl(video.id),
      })),
    };
  }

  async update(id: string, data: any) {
    const { videos, files, ...lessonData } = data;

    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch existing lesson to get file paths for cleanup
      const existingLesson = await tx.lesson.findUnique({
        where: { id },
        include: { videos: true, files: true },
      });

      if (!existingLesson) throw new NotFoundException('Lesson not found');

      // 2. Cleanup old physical files if they are being replaced
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

      // Cleanup lesson main video/file if they are changed
      if (
        existingLesson.videoUrl &&
        data.videoUrl &&
        existingLesson.videoUrl !== data.videoUrl
      ) {
        this.streamingService.deleteFile(existingLesson.videoUrl);
      }
      if (
        existingLesson.fileUrl &&
        data.fileUrl &&
        existingLesson.fileUrl !== data.fileUrl
      ) {
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

      // Trigger HLS conversion in background
      this.triggerHlsConversion(updatedLesson);

      return updatedLesson;
    });
  }

  private triggerHlsConversion(lesson: any) {
    if (!lesson.videos || lesson.videos.length === 0) return;

    lesson.videos.forEach(async (video: any) => {
      if (!video.videoUrl) return;

      // Resolve path (similar to StreamingService logic)
      let fullPath: string;
      if (video.videoUrl.startsWith('/uploads')) {
        fullPath = path.join(process.cwd(), 'public', video.videoUrl);
      } else {
        fullPath = path.join(process.cwd(), video.videoUrl);
      }

      // Convert in background
      this.streamingService.convertToHls(video.id, fullPath).catch((err) => {
        console.error(
          `[LessonsService] HLS Conversion failed for video ${video.id}:`,
          err,
        );
      });
    });
  }

  async remove(id: string) {
    // 1. Fetch lesson to get all file paths
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { videos: true, files: true },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    // 2. Delete physical files
    if (lesson.videoUrl) this.streamingService.deleteFile(lesson.videoUrl);
    if (lesson.fileUrl) this.streamingService.deleteFile(lesson.fileUrl);

    for (const video of lesson.videos) {
      await this.streamingService.deleteHlsResults(video.id);
      this.streamingService.deleteFile(video.videoUrl);
    }

    for (const file of lesson.files) {
      this.streamingService.deleteFile(file.fileUrl);
    }

    // 3. Delete from DB (Cascade will handle sub-records in DB)
    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
