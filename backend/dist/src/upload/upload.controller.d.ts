import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    uploadVideo(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
    }>;
    uploadAudio(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
