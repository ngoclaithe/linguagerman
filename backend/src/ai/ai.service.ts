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


    const systemPrompt = `You are Anna Keller, a friendly and intelligent German teacher. You ALWAYS reply in valid JSON only, no markdown, no explanation outside JSON.

STUDENT INFO:
- CEFR Level: ${level}
- Topic: ${topic}

CONVERSATION SO FAR:
${conversationLog.length > 0 ? conversationLog.join('\n') : '(New conversation)'}

RULES:
1. The student just said: "${userInput}"
2. Analyze their input:
   - If they wrote in a NON-German language (Vietnamese, English, etc.), set "suggestion" to the correct German translation of what they meant, and "explanation" to a Vietnamese explanation of the German sentence.
   - If they wrote German with grammar/spelling mistakes, set "suggestion" to the corrected German sentence, and "explanation" to a Vietnamese explanation of what was wrong.
   - If their German is perfect, set "suggestion" to "" and "explanation" to "".
3. Always set "nextPhrase" to your conversational response AS Anna Keller in German, appropriate for ${level} level.

RESPOND WITH ONLY THIS JSON (no other text):
{"suggestion":"corrected German or empty","explanation":"Vietnamese explanation or empty","nextPhrase":"your German response as Anna"}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        temperature: 0.7,
        max_tokens: 1024,
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
