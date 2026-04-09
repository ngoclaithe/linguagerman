import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface GrammarCorrection {
  original: string;
  corrected: string;
  type: string;
  explanation: string;
  severity: 'error' | 'warning' | 'suggestion';
}

export interface GrammarResponse {
  hasError: boolean;
  corrections: GrammarCorrection[];
}

@Injectable()
export class GrammarService {
  private readonly logger = new Logger(GrammarService.name);
  private llmUrl: string;

  constructor(private configService: ConfigService) {
    this.llmUrl = this.configService.get<string>('LLM_SERVER_URL') || 'http://localhost:8000';
  }

  async checkGrammar(text: string, cefr: string): Promise<GrammarResponse> {
    try {
      const response = await fetch(`${this.llmUrl}/grammar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, cefr }),
      });

      if (!response.ok) {
        throw new Error(`LLM grammar check failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        hasError: !!data.hasError,
        corrections: data.corrections || [],
      };
    } catch (error) {
      this.logger.error(`Error checking grammar: ${error.message}`);
      return { hasError: false, corrections: [] };
    }
  }
}
