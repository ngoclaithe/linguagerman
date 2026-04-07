import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGermanDto } from './dto/chat-german.dto';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      baseURL: this.configService.get<string>('OPENAI_BASE_URL') || 'https://api.openai.com/v1',
    });
  }

  async processGermanChat(dto: ChatGermanDto) {
    const { userInput, conversationLog, topic, level } = dto;


    const systemPrompt = `You are a highly intelligent and friendly German Assistent/Teacher named Anna Keller.
    Target student CEFR level: ${level}
    Current conversation topic: ${topic}
    
    Conversation history log so far (read only to understand context):
    ${conversationLog.join('\n')}

    Your task:
    1. Check the user's latest input for German grammar, spelling, or vocabulary mistakes. If they used English or another language, the suggestion should be the German equivalent.
    2. Respond to the user's input contextually in German to continue the roleplay, restricted to the CEFR ${level}.
    3. Output EXACTLY as JSON in the following format:
       {
         "suggestion": "Corrected sentence or empty",
         "explanation": "Explanation in Vietnamese or empty",
         "nextPhrase": "Your response as Anna"
       }
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
      });

      const responseText = completion.choices[0].message.content || '{}';
      
      // Extract ONLY the JSON part to ignore <think> tags or markdown backticks
      let cleanJson = responseText;
      const firstBrace = cleanJson.indexOf('{');
      const lastBrace = cleanJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace >= firstBrace) {
          cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
      }
      
      let parsedResponse;
      try {
          parsedResponse = JSON.parse(cleanJson);
      } catch (parseError) {
          console.warn("AI didn't return valid JSON. Raw output:", responseText);
          parsedResponse = {
              suggestion: "",
              explanation: "",
              nextPhrase: responseText || "..."
          };
      }
      
      return parsedResponse;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new InternalServerErrorException('Failed to process AI response');
    }
  }

  async translateText(text: string) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
          { role: 'system', content: 'You are a translator. Translate the given German text to Vietnamese. DO NOT include any other words or explanations, ONLY the direct translation.' },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 256
      });
      let translation = completion.choices[0].message.content || '...';
      
      // Clean up <think> tags if reasoning model is used
      const thinkEnd = translation.lastIndexOf('</think>');
      if (thinkEnd !== -1) {
          translation = translation.substring(thinkEnd + 8).trim();
      }

      return { translation: translation.trim() };
    } catch (err) {
      console.error('Translate Error:', err);
      return { translation: "Lỗi dịch thuật." };
    }
  }
}
