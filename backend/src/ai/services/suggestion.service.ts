import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuggestionService {
  private readonly logger = new Logger(SuggestionService.name);
  private llmUrl: string;

  constructor(private configService: ConfigService) {
    this.llmUrl = this.configService.get<string>('LLM_SERVER_URL') || 'http://localhost:8000';
  }

  async getSuggestions(lastMessage: string, topic: string, cefr: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.llmUrl}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last_ai_message: lastMessage, topic, cefr }),
      });

      if (!response.ok) {
        throw new Error(`LLM suggest failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      this.logger.error(`Error generating suggestions: ${error.message}`);
      return [];
    }
  }
}
