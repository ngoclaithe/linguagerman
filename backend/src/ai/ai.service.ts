import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatGermanDto } from './dto/chat-german.dto';
import { getPersona, PERSONAS } from './personas';
import OpenAI from 'openai';
import translate from 'google-translate-api-x';

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

  getPersonas() {
    return Object.values(PERSONAS).map(p => ({
      id: p.id,
      name: p.name,
      role: p.role,
      avatar: p.avatar,
      color: p.color,
      greeting: p.greeting,
      topics: p.topics,
    }));
  }

  async processGermanChat(dto: ChatGermanDto) {
    const { userInput, history, persona: personaId, topic, level } = dto;
    const persona = getPersona(personaId || 'anna');

    // ===== CALL 1: Get persona's response (pure conversation) =====
    const chatMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: persona.systemPrompt + `\nThema: ${topic}\nNiveau: ${level}` },
    ];

    if (history && history.length > 0) {
      // Mistral requires strict user/assistant alternation after system.
      // If history starts with assistant (greeting), prepend implicit user "Hallo"
      if (history[0].role === 'assistant') {
        chatMessages.push({ role: 'user', content: 'Hallo' });
      }
      
      for (let i = 0; i < history.length; i++) {
        const msg = history[i];
        const role = msg.role === 'user' ? 'user' : 'assistant';
        
        // Skip if same role as previous (would break alternation)
        const lastRole = chatMessages[chatMessages.length - 1]?.role;
        if (role === lastRole) continue;
        
        chatMessages.push({ role, content: msg.content });
      }
    }

    // Ensure current user message doesn't duplicate role
    const lastRole = chatMessages[chatMessages.length - 1]?.role;
    if (lastRole === 'user') {
      // Replace last user message with current input
      chatMessages[chatMessages.length - 1].content = userInput;
    } else {
      chatMessages.push({ role: 'user', content: userInput });
    }

    let nextPhrase = "Entschuldigung, kannst du das wiederholen?";
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        model: 'mistralai/Mistral-7B-Instruct-v0.3',
        messages: chatMessages,
        temperature: 0.6,
        max_tokens: 80,
        frequency_penalty: 0.7,
        stop: ['\n\n', 'Schüler:', 'Student:', '(', 'User:'],
      });

      nextPhrase = chatCompletion.choices[0].message.content?.trim() || nextPhrase;

      // Clean up JSON if model outputs it
      if (nextPhrase.startsWith('{')) {
        try {
          const parsed = JSON.parse(nextPhrase.replace(/```json?|```/g, '').trim());
          nextPhrase = parsed.nextPhrase || parsed.response || parsed.content || nextPhrase;
        } catch {
          nextPhrase = nextPhrase.replace(/[{}"]/g, '').replace(/nextPhrase:/i, '').trim();
        }
      }

      nextPhrase = nextPhrase.replace(/```[\s\S]*```/g, '').trim();
      nextPhrase = nextPhrase.replace(/\s*\([^)]*\)/g, '').trim();

      const lines = nextPhrase.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0) {
        nextPhrase = lines[0];
      }

      // Strip role prefixes
      const namePattern = new RegExp(`^(${persona.name}|Anna|Hanna|Lisa|Max|Thomas|Lehrerin|Assistant|Bot)\\s*[:;]\\s*`, 'i');
      nextPhrase = nextPhrase.replace(namePattern, '').trim();

    } catch (error) {
      console.error('Chat Error:', error);
    }

    // ===== CALL 2: Grammar check (separate) =====
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
        } catch {}
      }
    } catch (error) {
      console.error('Grammar Check Error:', error);
    }

    return { nextPhrase, suggestion, explanation };
  }

  async translateText(text: string) {
    try {
      const result = await translate(text, { from: 'de', to: 'vi' });
      return { translation: result.text };
    } catch (err) {
      console.error('Google Translate Error:', err);
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
    const { history, topic, level, persona: personaId } = dto;
    const persona = getPersona(personaId || 'anna');

    let conversationText = '(Cuộc trò chuyện mới)';
    if (history && history.length > 0) {
      conversationText = history.map((m: any) =>
        m.role === 'user' ? `Schüler: ${m.content}` : `${persona.name}: ${m.content}`
      ).join('\n');
    }

    const systemPrompt = `Gợi ý 3 câu tiếng Đức mà học viên có thể nói tiếp. Kèm nghĩa tiếng Việt.
CHỈ trả về JSON array. KHÔNG tiếng Anh.

Ví dụ:
Hội thoại: "${persona.name}: Hallo! Wie heißt du?"
[{"german":"Ich heiße Ngoc.","vietnamese":"Tôi tên là Ngọc."},{"german":"Guten Tag! Mein Name ist Mai.","vietnamese":"Xin chào! Tên tôi là Mai."},{"german":"Hallo! Ich bin Linh.","vietnamese":"Chào! Tôi là Linh."}]

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
