import { AiService } from './ai.service';
import { ChatGermanDto } from './dto/chat-german.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    chatGerman(chatDto: ChatGermanDto): Promise<any>;
    translate(body: {
        text: string;
    }): Promise<{
        translation: string;
    }>;
    suggestReplies(body: any): Promise<{
        suggestions: any;
    }>;
}
