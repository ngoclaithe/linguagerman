import { PrismaService } from '../prisma/prisma.service';
export declare class StreamingService {
    private prisma;
    private readonly secretKey;
    private readonly storagePath;
    constructor(prisma: PrismaService);
    generateSignedUrl(videoId: string): {
        signature: string;
        expires: number;
    };
    private verifySignature;
    convertToHls(videoId: string, inputFilePath: string): Promise<boolean>;
    getHlsPlaylist(videoId: string, sig: string, expires: string, res: any): Promise<any>;
    getHlsSegment(videoId: string, segment: string, sig: string, expires: string, res: any): Promise<any>;
    getHlsKey(videoId: string, sig: string, expires: string, res: any): Promise<any>;
    deleteHlsResults(videoId: string): Promise<void>;
    deleteFile(relativeOrAbsolutePath: string): void;
    streamVideo(videoId: string, range: string, res: any, query: any): Promise<void>;
}
