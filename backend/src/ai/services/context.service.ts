import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Injectable()
export class ContextService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;
  private readonly logger = new Logger(ContextService.name);
  private memoryFallback: Map<string, string> = new Map();
  private useRedis = false;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    try {
      this.redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        retryStrategy: (times) => {
          if (times > 3) {
             this.logger.warn('Failed to connect to Redis, falling back to in-memory context');
             this.useRedis = false;
             return null; // Stop retrying
          }
          return Math.min(times * 200, 2000);
        }
      });
      
      this.redis.on('ready', () => {
        this.logger.log('Connected to Redis for AI Context Management');
        this.useRedis = true;
      });
      
      this.redis.on('error', (err) => {
        // Handle error silently during dev to fallback gracefully
      });
    } catch (e) {
      this.logger.warn('Redis init failed, using memory fallback', e);
    }
  }

  onModuleDestroy() {
    if (this.redis) {
      this.redis.disconnect();
    }
  }

  async getContext(userId: string, sessionId: string): Promise<ChatMessage[]> {
    const key = `context:${userId}:${sessionId}`;
    let data: string | null = null;
    
    if (this.useRedis) {
      try {
         data = await this.redis.get(key);
      } catch (e) {}
    } else {
      data = this.memoryFallback.get(key);
    }
    
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  async appendContext(userId: string, sessionId: string, turn: ChatMessage): Promise<void> {
    const key = `context:${userId}:${sessionId}`;
    const context = await this.getContext(userId, sessionId);
    
    // Add new turn and slice to keep last 20 messages
    context.push(turn);
    const trimmed = context.slice(-20);
    const serialized = JSON.stringify(trimmed);
    
    if (this.useRedis) {
      try {
        await this.redis.set(key, serialized, 'EX', 86400); // 24h TTL
      } catch (e) {}
    } else {
      this.memoryFallback.set(key, serialized);
    }
  }
}
