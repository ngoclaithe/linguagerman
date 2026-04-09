import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  private llmUrl: string;

  constructor(private configService: ConfigService) {
    this.llmUrl = this.configService.get<string>('LLM_SERVER_URL') || 'http://localhost:8000';
  }

  // Returns an async generator for the chunks
  async streamChat(messages: any[], systemPrompt: string): Promise<AsyncGenerator<string, void, unknown>> {
    try {
      const response = await fetch(`${this.llmUrl}/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, system_prompt: systemPrompt }),
      });

      if (!response.body) {
        throw new Error('No response body from LLM');
      }

      // Handle streaming response using Web Streams API
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      return async function* () {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          yield chunk;
        }
      }();
    } catch (error) {
      this.logger.error(`Failed to stream chat: ${error.message}`);
      throw error;
    }
  }
}
