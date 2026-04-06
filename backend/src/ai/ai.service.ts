import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatGermanDto } from './dto/chat-german.dto';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async processGermanChat(dto: ChatGermanDto) {
    const { userInput, conversationLog, topic, level } = dto;

    const GermanCorrectionFormat = z.object({
      suggestion: z.string().describe("Corrected/better German sentence. Empty string if user's grammar was perfectly suitable."),
      explanation: z.string().describe("In Vietnamese: Explain precisely the German grammar/vocabulary mistakes made by the user, if any. Tell them about Der/Die/Das or cases if applicable. If perfect, leave empty string."),
      nextPhrase: z.string().describe("The AI native German response to continue the conversation in character (Anna Keller, German teacher). Must adhere to vocabulary restrictions of the specified CEFR level."),
    });

    const systemPrompt = `You are a highly intelligent and friendly German Assistent/Teacher named Anna Keller.
    Target student CEFR level: ${level}
    Current conversation topic: ${topic}
    
    Conversation history log so far (read only to understand context):
    ${conversationLog.join('\n')}

    Your task:
    1. Check the user's latest input for German grammar, spelling, or vocabulary mistakes. If they used English or another language, the suggestion should be the German equivalent.
    2. Respond to the user's input contextually in German to continue the roleplay, restricted to the CEFR ${level}.
    3. Output EXACTLY as JSON.
    `;

    try {
      const completion = await this.openai.beta.chat.completions.parse({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        response_format: zodResponseFormat(GermanCorrectionFormat, 'german_correction'),
      });

      const parsedResponse = completion.choices[0].message.parsed;
      return parsedResponse;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new InternalServerErrorException('Failed to process AI response');
    }
  }
}
