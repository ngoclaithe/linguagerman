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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
let StreamingService = class StreamingService {
    prisma;
    secretKey = process.env.JWT_SECRET || 'your-default-secret-key';
    storagePath = path.join(process.cwd(), 'storage', 'hls');
    constructor(prisma) {
        this.prisma = prisma;
        if (!fs.existsSync(this.storagePath)) {
            fs.mkdirSync(this.storagePath, { recursive: true });
        }
    }
    generateSignedUrl(videoId) {
        const expires = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
        const data = `${videoId}:${expires}`;
        const signature = crypto
            .createHmac('sha256', this.secretKey)
            .update(data)
            .digest('hex');
        return { signature, expires };
    }
    verifySignature(videoId, signature, expires) {
        const now = Math.floor(Date.now() / 1000);
        if (parseInt(expires) < now) {
            return false;
        }
        const data = `${videoId}:${expires}`;
        const expectedSignature = crypto
            .createHmac('sha256', this.secretKey)
            .update(data)
            .digest('hex');
        return signature === expectedSignature;
    }
    async convertToHls(videoId, inputFilePath) {
        const outputDir = path.join(this.storagePath, videoId);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const keyFile = path.join(outputDir, 'video.key');
        const keyInfoFile = path.join(outputDir, 'video.keyinfo');
        const m3u8File = path.join(outputDir, 'index.m3u8');
        const key = crypto.randomBytes(16);
        fs.writeFileSync(keyFile, key);
        const keyUrl = `/api/v1/streaming/hls/${videoId}/key`;
        fs.writeFileSync(keyInfoFile, `${keyUrl}\n${keyFile}`);
        const ffmpegCmd = `ffmpeg -i "${inputFilePath}" -c:v libx264 -c:a aac -b:v 1M -strict -2 -hls_time 10 -hls_list_size 0 -hls_key_info_file "${keyInfoFile}" -hls_segment_filename "${path.join(outputDir, 'segment_%03d.ts')}" "${m3u8File}"`;
        console.log(`[StreamingService] Starting HLS conversion for ${videoId}...`);
        try {
            await execAsync(ffmpegCmd);
            console.log(`[StreamingService] HLS conversion finished for ${videoId}`);
            return true;
        }
        catch (error) {
            console.error(`[StreamingService] FFmpeg error for ${videoId}:`, error);
            throw error;
        }
    }
    async getHlsPlaylist(videoId, sig, expires, res) {
        if (!this.verifySignature(videoId, sig, expires)) {
            return res.status(403).send('Link đã hết hạn');
        }
        const playlistPath = path.join(this.storagePath, videoId, 'index.m3u8');
        if (!fs.existsSync(playlistPath)) {
            return res.status(404).send('Playlist not found');
        }
        let content = fs.readFileSync(playlistPath, 'utf8');
        const queryParams = `sig=${sig}&expires=${expires}`;
        content = content.replace(/segment_(\d+)\.ts/g, `segment_$1.ts?${queryParams}`);
        content = content.replace(/URI="(.*)\/key"/g, `URI="$1/key?${queryParams}"`);
        res.set('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(content);
    }
    async getHlsSegment(videoId, segment, sig, expires, res) {
        if (!this.verifySignature(videoId, sig, expires)) {
            return res.status(403).send('Link đã hết hạn');
        }
        const segmentPath = path.join(this.storagePath, videoId, segment);
        if (!fs.existsSync(segmentPath)) {
            return res.status(404).send('Segment not found');
        }
        res.sendFile(segmentPath);
    }
    async getHlsKey(videoId, sig, expires, res) {
        if (!this.verifySignature(videoId, sig, expires)) {
            return res.status(403).send('Link đã hết hạn');
        }
        const keyPath = path.join(this.storagePath, videoId, 'video.key');
        if (!fs.existsSync(keyPath)) {
            return res.status(404).send('Key not found');
        }
        res.set('Content-Type', 'application/octet-stream');
        res.sendFile(keyPath);
    }
    async deleteHlsResults(videoId) {
        const outputDir = path.join(this.storagePath, videoId);
        if (fs.existsSync(outputDir)) {
            console.log(`[StreamingService] Deleting HLS directory: ${outputDir}`);
            fs.rmSync(outputDir, { recursive: true, force: true });
        }
    }
    deleteFile(relativeOrAbsolutePath) {
        let fullPath;
        if (relativeOrAbsolutePath.startsWith('/uploads')) {
            fullPath = path.join(process.cwd(), 'public', relativeOrAbsolutePath);
        }
        else if (path.isAbsolute(relativeOrAbsolutePath)) {
            fullPath = relativeOrAbsolutePath;
        }
        else {
            fullPath = path.join(process.cwd(), relativeOrAbsolutePath);
        }
        if (fs.existsSync(fullPath)) {
            console.log(`[StreamingService] Deleting physical file: ${fullPath}`);
            fs.unlinkSync(fullPath);
        }
    }
    async streamVideo(videoId, range, res, query) {
        const { sig, expires } = query;
        if (!sig || !expires || !this.verifySignature(videoId, sig, expires)) {
            console.error(`[StreamingService] Invalid or expired signature for video: ${videoId}`);
            res
                .status(403)
                .send('Link truy cập video đã hết hạn hoặc không hợp lệ. Vui lòng tải lại trang.');
            return;
        }
        console.log(`[StreamingService] Request for videoId: ${videoId} | Range: ${range}`);
        console.log(`[StreamingService] Request for videoId: ${videoId} | Range: ${range}`);
        const video = await this.prisma.lessonVideo.findUnique({
            where: { id: videoId },
        });
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        let filePath;
        if (video.videoUrl.startsWith('/uploads')) {
            filePath = path.join(process.cwd(), 'public', video.videoUrl);
        }
        else {
            filePath = path.join(process.cwd(), video.videoUrl);
        }
        if (!fs.existsSync(filePath)) {
            console.error(`File physically not found: ${filePath}`);
            throw new common_1.NotFoundException('Video file missing on server');
        }
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            if (start >= fileSize) {
                res
                    .status(416)
                    .send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
                return;
            }
            const chunksize = end - start + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            console.log(`[StreamingService] Serving partial content: ${start}-${end}/${fileSize}`);
            res.writeHead(206, head);
            file.pipe(res);
        }
        else {
            console.log(`[StreamingService] Serving full file: ${fileSize} bytes`);
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    }
};
exports.StreamingService = StreamingService;
__decorate([
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StreamingService.prototype, "getHlsPlaylist", null);
__decorate([
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StreamingService.prototype, "getHlsSegment", null);
__decorate([
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StreamingService.prototype, "getHlsKey", null);
__decorate([
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], StreamingService.prototype, "streamVideo", null);
exports.StreamingService = StreamingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StreamingService);
//# sourceMappingURL=streaming.service.js.map