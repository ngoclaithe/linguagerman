export declare class ChatMessageDto {
    role: 'user' | 'assistant';
    content: string;
}
export declare class ChatGermanDto {
    userInput: string;
    history?: ChatMessageDto[];
    conversationLog?: string[];
    topic?: string;
    level?: string;
}
