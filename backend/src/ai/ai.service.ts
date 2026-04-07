import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGermanDto } from './dto/chat-german.dto';
import OpenAI from 'openai';
import translate from 'google-translate-api-x';

// CALL 1: Pure conversation — Anna responds naturally in German
const CHAT_SYSTEM_PROMPT = `Du bist Anna Keller, eine freundliche Deutschlehrerin aus Berlin, 28 Jahre alt.
Du führst ein natürliches Gespräch mit einem Schüler auf Deutsch (Niveau A1-A2).

REGELN:
- Antworte IMMER auf Deutsch. Nur Deutsch.
- KEIN Englisch. KEINE Übersetzungen in Klammern.
- Beantworte Fragen des Schülers DIREKT und ehrlich.
- Wiederhole NICHT die gleiche Frage. Führe das Gespräch weiter.
- Merke dir was der Schüler gesagt hat (Name, Herkunft, etc.).
- Halte deine Antworten kurz (1-2 Sätze).`;

// CALL 2: Grammar correction — separate analysis
const GRAMMAR_SYSTEM_PROMPT = `Du bist ein Deutsch-Grammatikprüfer. Prüfe den folgenden deutschen Satz eines Schülers.

REGELN:
- Wenn der Satz KORREKTES Deutsch ist: antworte NUR mit dem Wort "OK"
- Wenn der Satz Fehler hat oder NICHT auf Deutsch ist: antworte mit JSON:
  {"suggestion":"korrigierter deutscher Satz","explanation":"kurze Erklärung auf Vietnamesisch"}
- Einfache Grüße wie "hallo", "danke", "ja", "nein" sind IMMER korrekt → "OK"
- Antworte NUR mit "OK" oder dem JSON. Nichts anderes.`;

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
    const { userInput, history, topic, level } = dto;

    // ===== CALL 1: Get Anna's response (pure conversation) =====
    const chatMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: CHAT_SYSTEM_PROMPT + `\nThema: ${topic}\nNiveau: ${level}` },
    ];

    // Add conversation history as natural alternating turns
    if (history && history.length > 0) {
      for (const msg of history) {
        chatMessages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      }
    }

    // Add current user message
    chatMessages.push({ role: 'user', content: userInput });

    let nextPhrase = "Entschuldigung, kannst du das wiederholen?";
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 256,
        frequency_penalty: 0.5,
      });

      nextPhrase = chatCompletion.choices[0].message.content?.trim() || nextPhrase;
      
      // Clean up any JSON or markdown the model might have slipped in
      if (nextPhrase.startsWith('{') || nextPhrase.startsWith('```')) {
        try {
          const parsed = JSON.parse(nextPhrase.replace(/```json?|```/g, '').trim());
          nextPhrase = parsed.nextPhrase || parsed.response || nextPhrase;
        } catch {
          // If it's not valid JSON, strip braces
          nextPhrase = nextPhrase.replace(/[{}"]/g, '').replace(/nextPhrase:/i, '').trim();
        }
      }
      
      // Remove any English translations in parentheses
      nextPhrase = nextPhrase.replace(/\s*\([^)]*(?:translation|meaning|English|Vietnamese)[^)]*\)/gi, '');
      
    } catch (error) {
      console.error('Chat Error:', error);
    }

    // ===== CALL 2: Grammar check (separate, parallel-safe) =====
    let suggestion = "";
    let explanation = "";
    
    try {
      const grammarCompletion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: GRAMMAR_SYSTEM_PROMPT },
          { role: 'user', content: userInput },
        ],
        temperature: 0.1,
        max_tokens: 200,
      });

      const grammarResult = grammarCompletion.choices[0].message.content?.trim() || 'OK';
      
      if (grammarResult !== 'OK' && grammarResult.includes('{')) {
        try {
          const firstBrace = grammarResult.indexOf('{');
          const lastBrace = grammarResult.lastIndexOf('}');
          const jsonStr = grammarResult.slice(firstBrace, lastBrace + 1);
          const parsed = JSON.parse(jsonStr);
          suggestion = parsed.suggestion || "";
          explanation = parsed.explanation || "";
        } catch {
          // Grammar check failed to parse, skip correction
        }
      }
    } catch (error) {
      console.error('Grammar Check Error:', error);
    }

    return { nextPhrase, suggestion, explanation };
  }

  // Use Google Translate instead of LLM — fast, accurate, free
  async translateText(text: string) {
    try {
      const result = await translate(text, { from: 'de', to: 'vi' });
      return { translation: result.text };
    } catch (err) {
      console.error('Google Translate Error:', err);
      // Fallback to LLM if Google Translate fails
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'mistralai/Mistral-7B-Instruct-v0.3',
          messages: [
            { role: 'system', content: 'Dịch sang tiếng Việt. CHỈ viết bản dịch.' },
            { role: 'user', content: text },
          ],
          temperature: 0.1,
          max_tokens: 256
        });
        return { translation: completion.choices[0].message.content?.trim() || '...' };
      } catch {
        return { translation: "Lỗi dịch thuật." };
      }
    }
  }

  async suggestReplies(dto: any) {
    const { history, conversationLog, topic, level } = dto;

    // Build conversation text from structured history
    let conversationText = '(Cuộc trò chuyện mới)';
    if (history && history.length > 0) {
      conversationText = history.map((m: any) =>
        m.role === 'user' ? `Schüler: ${m.content}` : `Anna: ${m.content}`
      ).join('\n');
    } else if (conversationLog && conversationLog.length > 0) {
      conversationText = conversationLog.join('\n');
    }

    const systemPrompt = `Gợi ý 3 câu tiếng Đức mà học viên có thể nói tiếp. Kèm nghĩa tiếng Việt.
CHỈ trả về JSON array. KHÔNG tiếng Anh.

Ví dụ:
Hội thoại: "Anna: Hallo! Wie heißt du?"
[{"german":"Ich heiße Ngoc.","vietnamese":"Tôi tên là Ngọc."},{"german":"Guten Tag! Mein Name ist Mai.","vietnamese":"Xin chào! Tên tôi là Mai."},{"german":"Hallo! Ich bin Linh.","vietnamese":"Chào! Tôi là Linh."}]

Hội thoại: "Schüler: Ich heiße Ngoc.\nAnna: Freut mich! Woher kommst du?"
[{"german":"Ich komme aus Vietnam.","vietnamese":"Tôi đến từ Việt Nam."},{"german":"Aus Hanoi.","vietnamese":"Từ Hà Nội."},{"german":"Aus Vietnam. Und du?","vietnamese":"Từ Việt Nam. Còn bạn?"}]

Hội thoại hiện tại (${level}):
${conversationText}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'JSON array:' },
        ],
        temperature: 0.4,
        max_tokens: 400,
      });

      let responseText = completion.choices[0].message.content || '[]';
      console.log("[DEBUG] suggestReplies RAW:", responseText);

      let cleanJson = responseText;
      const firstBracket = cleanJson.indexOf('[');
      const lastBracket = cleanJson.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket >= firstBracket) {
        cleanJson = cleanJson.slice(firstBracket, lastBracket + 1);
      }

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(cleanJson);
        if (!Array.isArray(parsedResponse) || !parsedResponse[0]?.german) {
          throw new Error('Invalid format');
        }
      } catch {
        parsedResponse = [
          { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại không?" },
          { german: "Ich verstehe.", vietnamese: "Tôi hiểu rồi." },
          { german: "Wie bitte?", vietnamese: "Xin lỗi, sao cơ?" }
        ];
      }

      return { suggestions: parsedResponse };
    } catch (error) {
      console.error('Suggest Error:', error);
      return {
        suggestions: [
          { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại không?" },
          { german: "Ich verstehe.", vietnamese: "Tôi hiểu rồi." },
          { german: "Wie bitte?", vietnamese: "Xin lỗi, sao cơ?" }
        ]
      };
    }
  }
}
