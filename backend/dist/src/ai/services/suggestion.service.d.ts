import { ConfigService } from '@nestjs/config';
export declare class SuggestionService {
    private configService;
    private readonly logger;
    private llmUrl;
    constructor(configService: ConfigService);
    getSuggestions(lastMessage: string, topic: string, cefr: string): Promise<string[]>;
}
