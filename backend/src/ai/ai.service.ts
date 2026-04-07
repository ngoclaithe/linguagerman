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

    const systemPrompt = `You are Anna Keller, a friendly German teacher. 
You MUST output ONLY a pure, valid JSON object. No explanation, no markdown.

STUDENT'S MESSAGE: "${userInput}"
CEFR LEVEL: ${level}
TOPIC: ${topic}

CONVERSATION LOG:
${conversationLog.length > 0 ? conversationLog.join('\n') : '(New conversation)'}

# TASK
Respond to the student in German as Anna Keller ("nextPhrase").
If the student makes a grammar mistake, provide the correction ("suggestion") and a short Vietnamese explanation ("explanation"). If their German is correct, leave "suggestion" and "explanation" empty ("").

# EXAMPLES
User: "hallo"
Output: {"suggestion":"", "explanation":"", "nextPhrase":"Hallo! Wie geht es dir heute?"}

User: "ich bin gut"
Output: {"suggestion":"Mir geht es gut.", "explanation":"Trong tiếng Đức, để nói 'tôi khoẻ', ta dùng 'Mir geht es gut' chứ không dùng 'Ich bin gut'.", "nextPhrase":"Das freut mich zu hören! Was machst du gerade?"}

User: "bạn tên gì"
Output: {"suggestion":"Wie heißt du?", "explanation":"Câu hỏi 'bạn tên gì' trong tiếng Đức là 'Wie heißt du?'.", "nextPhrase":"Ich heiße Anna. Und wie heißt du?"}

User: "Wo kommst du her?"
Output: {"suggestion":"", "explanation":"", "nextPhrase":"Ich komme aus München. Und woher kommst du?"}

# YOUR TURN
Output ONLY the JSON object.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput },
        ],
        temperature: 0.1, // Even lower to strictly output JSON format
        max_tokens: 512,
      });

      let responseText = completion.choices[0].message.content || '{}';
      
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
              nextPhrase: responseText.replace(/[\{\}]/g, '').trim() || "Entschuldigung, ich habe dich nicht verstanden."
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
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: 'You are a translator. Translate the given German text to natural Vietnamese. OUTPUT ONLY THE VIETNAMESE TRANSLATION. NEVER explain. NEVER write the original text. NEVER write English.\n\nExample 1:\nGerman: Wie heißen Sie?\nOutput: Tên của bạn là gì?\n\nExample 2:\nGerman: Guten Tag! Wie geht es dir?\nOutput: Chào buổi sáng! Bạn có khoẻ không?' },
          { role: 'user', content: text },
        ],
        temperature: 0.1,
        max_tokens: 256
      });
      let translation = completion.choices[0].message.content || '...';
      
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

  async suggestReplies(dto: any) {
    const { conversationLog, topic, level } = dto;
    const systemPrompt = `You are a helpful German language assistant. 
You MUST output ONLY a valid JSON ARRAY of exactly 3 objects. No markdown, no explanations.

CEFR LEVEL: ${level}
TOPIC: ${topic}

CONVERSATION LOG:
${conversationLog && conversationLog.length > 0 ? conversationLog.join('\n') : '(New conversation)'}

TASK:
Provide exactly 3 short, natural German phrases the student could say NEXT to continue the conversation. Also provide the Vietnamese meaning for each phrase.

STRICT JSON ARRAY FORMAT REQUIRED:
[
  { "german": "Phrase 1 in German", "vietnamese": "Meaning in Vietnamese" },
  { "german": "Phrase 2 in German", "vietnamese": "Meaning in Vietnamese" },
  { "german": "Phrase 3 in German", "vietnamese": "Meaning in Vietnamese" }
]`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Please give me 3 German suggestions for what to say next. Reply in JSON array format ONLY.' },
        ],
        temperature: 0.5,
        max_tokens: 350,
      });

      let responseText = completion.choices[0].message.content || '[]';
      
      let cleanJson = responseText;
      const firstBracket = cleanJson.indexOf('[');
      const lastBracket = cleanJson.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket >= firstBracket) {
          cleanJson = cleanJson.slice(firstBracket, lastBracket + 1);
      }
      
      let parsedResponse;
      try {
          console.log("[DEBUG] suggestReplies RAW output:", responseText);
          parsedResponse = JSON.parse(cleanJson);
          if (!Array.isArray(parsedResponse) || !parsedResponse[0]?.german) {
              console.warn("AI returned JSON but not array of objects:", parsedResponse);
              parsedResponse = [
                  { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại được không?" },
                  { german: "Ich verstehe nicht.", vietnamese: "Tôi không hiểu." },
                  { german: "Wie bitte?", vietnamese: "Dạ xin lỗi, sao cơ?" }
              ];
          }
      } catch (parseError) {
          console.warn("AI didn't return valid JSON array. Raw output:", responseText);
          parsedResponse = [
              { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại được không?" },
              { german: "Ich verstehe nicht.", vietnamese: "Tôi không hiểu." },
              { german: "Wie bitte?", vietnamese: "Dạ xin lỗi, sao cơ?" }
          ];
      }
      
      return { suggestions: parsedResponse };
    } catch (error) {
      console.error('OpenAI Error:', error);
      return { suggestions: [
          { german: "Ein Moment bitte...", vietnamese: "Xin chờ một lát..." },
          { german: "Gute Frage!", vietnamese: "Câu hỏi hay đấy!" },
          { german: "Lass mich überlegen.", vietnamese: "Để tôi suy nghĩ đã." }
      ] };
    }
  }
}
