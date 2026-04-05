import { Injectable, BadRequestException } from '@nestjs/common';
import sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private readonly uploadDir = 'public/uploads';
  private readonly uploadPath = path.join(process.cwd(), this.uploadDir);

  constructor() {
    this.ensureUploadPathExists();
  }

  private ensureUploadPathExists() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async saveImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const name = file.originalname
      .split('.')[0]
      .replace(/\s+/g, '-')
      .toLowerCase();
    const fileName = `${Date.now()}-${name}.webp`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      const img = sharp(file.buffer);
      await img.webp({ quality: 80 }).toFile(filePath);

      // Return the public URL
      return `/uploads/${fileName}`;
    } catch (error) {
      console.error('Image processing error:', error);
      throw new BadRequestException('Failed to process image');
    }
  }

  async saveVideo(file: Express.Multer.File): Promise<string> {
    if (!file || !file.mimetype.startsWith('video/')) {
      throw new BadRequestException('Only video files are allowed');
    }

    const videoDir = path.join(process.cwd(), 'storage', 'videos');
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const name = file.originalname
      .split('.')[0]
      .replace(/\s+/g, '-')
      .toLowerCase();
    const fileName = `${Date.now()}-${name}${ext}`;
    const filePath = path.join(videoDir, fileName);

    try {
      fs.writeFileSync(filePath, file.buffer);
      // Internal path used by streaming service
      return `storage/videos/${fileName}`;
    } catch (error) {
      console.error('Video upload error:', error);
      throw new BadRequestException('Failed to upload video');
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileDir = path.join(this.uploadPath, 'files');
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const name = file.originalname
      .split('.')[0]
      .replace(/\s+/g, '-')
      .toLowerCase();
    const fileName = `${Date.now()}-${name}${ext}`;
    const filePath = path.join(fileDir, fileName);

    try {
      fs.writeFileSync(filePath, file.buffer);
      return `/uploads/files/${fileName}`;
    } catch (error) {
      console.error('File upload error:', error);
      throw new BadRequestException('Failed to upload file');
    }
  }

  async saveAudio(file: Express.Multer.File): Promise<string> {
    if (!file || !file.mimetype.startsWith('audio/')) {
      throw new BadRequestException('Only audio files are allowed');
    }

    const audioDir = path.join(this.uploadPath, 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const name = file.originalname
      .split('.')[0]
      .replace(/\s+/g, '-')
      .toLowerCase();
    const fileName = `${Date.now()}-${name}${ext}`;
    const filePath = path.join(audioDir, fileName);

    try {
      fs.writeFileSync(filePath, file.buffer);
      return `/uploads/audio/${fileName}`;
    } catch (error) {
      console.error('Audio upload error:', error);
      throw new BadRequestException('Failed to upload audio');
    }
  }
}
