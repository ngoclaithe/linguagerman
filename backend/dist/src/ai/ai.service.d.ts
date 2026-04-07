import { ConfigService } from '@nestjs/config';
import { ChatGermanDto } from './dto/chat-german.dto';
export declare class AiService {
    private configService;
    private openai;
    constructor(configService: ConfigService);
    getPersonas(): {
        id: string;
        name: string;
        role: string;
        avatar: string;
        color: string;
        greeting: string;
        topics: string[];
    }[];
    processGermanChat(dto: ChatGermanDto): Promise<{
        nextPhrase: string;
        suggestion: string;
        explanation: string;
    }>;
    translateText(text: string): Promise<{
        translation: string;
    }>;
    suggestReplies(dto: any): Promise<{
        suggestions: {
            german: string;
            vietnamese: string;
        }[];
    }>;
}
