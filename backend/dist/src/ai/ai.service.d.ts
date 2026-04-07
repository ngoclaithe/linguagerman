import { ConfigService } from '@nestjs/config';
import { ChatGermanDto } from './dto/chat-german.dto';
export declare class AiService {
    private configService;
    private openai;
    constructor(configService: ConfigService);
    processGermanChat(dto: ChatGermanDto): Promise<any>;
    translateText(text: string): Promise<{
        translation: string;
    }>;
    suggestReplies(dto: any): Promise<{
        suggestions: any;
    }>;
}
