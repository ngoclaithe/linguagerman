import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export declare class ContextService implements OnModuleInit, OnModuleDestroy {
    private configService;
    private redis;
    private readonly logger;
    private memoryFallback;
    private useRedis;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    getContext(userId: string, sessionId: string): Promise<ChatMessage[]>;
    appendContext(userId: string, sessionId: string, turn: ChatMessage): Promise<void>;
}
