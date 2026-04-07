import { AiService } from './ai.service';
import { ChatGermanDto } from './dto/chat-german.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    getPersonas(): {
        id: string;
        name: string;
        role: string;
        avatar: string;
        color: string;
        greeting: string;
        topics: string[];
    }[];
    chatGerman(chatDto: ChatGermanDto): Promise<{
        nextPhrase: string;
        suggestion: string;
        explanation: string;
    }>;
    translate(body: {
        text: string;
    }): Promise<{
        translation: string;
    }>;
    suggestReplies(body: any): Promise<{
        suggestions: {
            german: string;
            vietnamese: string;
        }[];
    }>;
}
