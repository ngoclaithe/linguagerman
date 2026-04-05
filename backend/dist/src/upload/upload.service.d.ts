export declare class UploadService {
    private readonly uploadDir;
    private readonly uploadPath;
    constructor();
    private ensureUploadPathExists;
    saveImage(file: Express.Multer.File): Promise<string>;
    saveVideo(file: Express.Multer.File): Promise<string>;
    saveFile(file: Express.Multer.File): Promise<string>;
    saveAudio(file: Express.Multer.File): Promise<string>;
}
