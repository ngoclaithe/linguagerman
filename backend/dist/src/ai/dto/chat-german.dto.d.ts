export declare class ChatMessageDto {
    role: 'user' | 'assistant';
    content: string;
}
export declare class ChatGermanDto {
    userInput: string;
    history?: ChatMessageDto[];
    persona?: string;
    topic?: string;
    level?: string;
}
