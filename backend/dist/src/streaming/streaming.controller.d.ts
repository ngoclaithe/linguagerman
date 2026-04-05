import { StreamingService } from './streaming.service';
export declare class StreamingController {
    private readonly streamingService;
    constructor(streamingService: StreamingService);
    streamVideo(id: string, range: string, res: any, req: any): Promise<void>;
    getHlsPlaylist(id: string, req: any, res: any): Promise<any>;
    getHlsKey(id: string, req: any, res: any): Promise<any>;
    getHlsSegment(id: string, segment: string, req: any, res: any): Promise<any>;
}
