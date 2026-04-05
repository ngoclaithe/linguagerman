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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
let UploadService = class UploadService {
    uploadDir = 'public/uploads';
    uploadPath = path.join(process.cwd(), this.uploadDir);
    constructor() {
        this.ensureUploadPathExists();
    }
    ensureUploadPathExists() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }
    async saveImage(file) {
        if (!file || !file.mimetype.startsWith('image/')) {
            throw new common_1.BadRequestException('Only image files are allowed');
        }
        const name = file.originalname
            .split('.')[0]
            .replace(/\s+/g, '-')
            .toLowerCase();
        const fileName = `${Date.now()}-${name}.webp`;
        const filePath = path.join(this.uploadPath, fileName);
        try {
            const img = (0, sharp_1.default)(file.buffer);
            await img.webp({ quality: 80 }).toFile(filePath);
            return `/uploads/${fileName}`;
        }
        catch (error) {
            console.error('Image processing error:', error);
            throw new common_1.BadRequestException('Failed to process image');
        }
    }
    async saveVideo(file) {
        if (!file || !file.mimetype.startsWith('video/')) {
            throw new common_1.BadRequestException('Only video files are allowed');
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
            return `storage/videos/${fileName}`;
        }
        catch (error) {
            console.error('Video upload error:', error);
            throw new common_1.BadRequestException('Failed to upload video');
        }
    }
    async saveFile(file) {
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
        }
        catch (error) {
            console.error('File upload error:', error);
            throw new common_1.BadRequestException('Failed to upload file');
        }
    }
    async saveAudio(file) {
        if (!file || !file.mimetype.startsWith('audio/')) {
            throw new common_1.BadRequestException('Only audio files are allowed');
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
        }
        catch (error) {
            console.error('Audio upload error:', error);
            throw new common_1.BadRequestException('Failed to upload audio');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map