import { ConfigService } from '@nestjs/config';
export declare class ChatService {
    private configService;
    private readonly logger;
    private llmUrl;
    constructor(configService: ConfigService);
    streamChat(messages: any[], systemPrompt: string): Promise<AsyncGenerator<string, void, unknown>>;
}
