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
      // Ensure user/assistant alternation after system prompt
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
        model: 'Qwen/Qwen2.5-7B-Instruct',
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
        model: 'Qwen/Qwen2.5-7B-Instruct',
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
          model: 'Qwen/Qwen2.5-7B-Instruct',
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
    const { history } = dto;

    // Get the last bot message to understand what was asked
    let lastBotMessage = '';
    if (history && history.length > 0) {
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].role === 'assistant') {
          lastBotMessage = history[i].content.toLowerCase();
          break;
        }
      }
    }

    // Pattern-match the last bot message and return contextual suggestions
    const patterns: { test: (msg: string) => boolean; suggestions: {german: string, vietnamese: string}[] }[] = [
      {
        test: (m) => /wie hei(ß|ss)t?\s*(du|sie)/i.test(m) || /dein(en?)?\s*name/i.test(m),
        suggestions: [
          { german: "Ich heiße Ngoc. Und du?", vietnamese: "Tôi tên là Ngọc. Còn bạn?" },
          { german: "Mein Name ist Ngoc. Freut mich!", vietnamese: "Tên tôi là Ngọc. Rất vui được gặp!" },
          { german: "Ich bin Ngoc aus Vietnam.", vietnamese: "Tôi là Ngọc, đến từ Việt Nam." },
        ]
      },
      {
        test: (m) => /wie geht('?s| es)\s*(dir|ihnen)/i.test(m) || /wie geht/i.test(m),
        suggestions: [
          { german: "Mir geht es gut, danke! Und dir?", vietnamese: "Tôi khoẻ, cảm ơn! Còn bạn?" },
          { german: "Sehr gut, danke der Nachfrage!", vietnamese: "Rất tốt, cảm ơn bạn đã hỏi!" },
          { german: "Nicht so gut, ich bin müde.", vietnamese: "Không tốt lắm, tôi mệt." },
        ]
      },
      {
        test: (m) => /woher\s*komm(st|en)/i.test(m) || /wo kommst du her/i.test(m),
        suggestions: [
          { german: "Ich komme aus Vietnam.", vietnamese: "Tôi đến từ Việt Nam." },
          { german: "Aus Hanoi, Vietnam. Und du?", vietnamese: "Từ Hà Nội, Việt Nam. Còn bạn?" },
          { german: "Ich bin aus Ho-Chi-Minh-Stadt.", vietnamese: "Tôi đến từ Thành phố Hồ Chí Minh." },
        ]
      },
      {
        test: (m) => /wie alt\s*(bist|sind)/i.test(m) || /alter/i.test(m),
        suggestions: [
          { german: "Ich bin 25 Jahre alt.", vietnamese: "Tôi 25 tuổi." },
          { german: "Ich bin zwanzig. Und du?", vietnamese: "Tôi 20 tuổi. Còn bạn?" },
          { german: "Das sage ich nicht! 😄", vietnamese: "Tôi không nói đâu! 😄" },
        ]
      },
      {
        test: (m) => /was (machst|machen|tust)\s*(du|sie)/i.test(m) || /beruf/i.test(m) || /was arbeitest/i.test(m),
        suggestions: [
          { german: "Ich bin Student. Ich studiere Informatik.", vietnamese: "Tôi là sinh viên. Tôi học Tin học." },
          { german: "Ich arbeite als Programmierer.", vietnamese: "Tôi làm lập trình viên." },
          { german: "Ich lerne gerade Deutsch!", vietnamese: "Tôi đang học tiếng Đức!" },
        ]
      },
      {
        test: (m) => /hobby/i.test(m) || /freizeit/i.test(m) || /was magst du/i.test(m) || /gern/i.test(m),
        suggestions: [
          { german: "Ich lese gern Bücher.", vietnamese: "Tôi thích đọc sách." },
          { german: "Ich spiele gern Fußball.", vietnamese: "Tôi thích chơi bóng đá." },
          { german: "Ich höre gern Musik und koche.", vietnamese: "Tôi thích nghe nhạc và nấu ăn." },
        ]
      },
      {
        test: (m) => /warum.*deutsch/i.test(m) || /deutsch.*lern/i.test(m),
        suggestions: [
          { german: "Ich möchte in Deutschland studieren.", vietnamese: "Tôi muốn du học ở Đức." },
          { german: "Deutsche Kultur interessiert mich.", vietnamese: "Văn hoá Đức khiến tôi quan tâm." },
          { german: "Ich brauche Deutsch für die Arbeit.", vietnamese: "Tôi cần tiếng Đức cho công việc." },
        ]
      },
      {
        test: (m) => /fächer|schule|universität|studier/i.test(m) || /was lernst/i.test(m),
        suggestions: [
          { german: "Ich mag Mathe und Physik.", vietnamese: "Tôi thích Toán và Vật lý." },
          { german: "Ich studiere Informatik.", vietnamese: "Tôi học ngành Tin học." },
          { german: "Sprachen sind mein Lieblingsfach.", vietnamese: "Ngoại ngữ là môn yêu thích của tôi." },
        ]
      },
      {
        test: (m) => /wetter|kalt|warm|regen|sonne/i.test(m),
        suggestions: [
          { german: "In Vietnam ist es sehr warm.", vietnamese: "Ở Việt Nam trời rất nóng." },
          { german: "Ich mag Sonnenschein.", vietnamese: "Tôi thích trời nắng." },
          { german: "Ist es in Deutschland kalt?", vietnamese: "Ở Đức có lạnh không?" },
        ]
      },
      {
        test: (m) => /essen|trinken|hunger|durst|lieblingsessen/i.test(m),
        suggestions: [
          { german: "Ich esse gern Pho.", vietnamese: "Tôi thích ăn Phở." },
          { german: "Ich trinke gern Kaffee.", vietnamese: "Tôi thích uống cà phê." },
          { german: "Was ist typisch deutsches Essen?", vietnamese: "Món ăn tiêu biểu của Đức là gì?" },
        ]
      },
      {
        test: (m) => /reisen|urlaub|besuch/i.test(m) || /wohin.*reis/i.test(m),
        suggestions: [
          { german: "Ich möchte Berlin besuchen.", vietnamese: "Tôi muốn thăm Berlin." },
          { german: "München klingt interessant!", vietnamese: "München nghe thú vị lắm!" },
          { german: "Welche Stadt empfiehlst du?", vietnamese: "Bạn giới thiệu thành phố nào?" },
        ]
      },
      {
        test: (m) => /familie/i.test(m) || /geschwister|bruder|schwester|eltern/i.test(m),
        suggestions: [
          { german: "Ich habe eine Schwester.", vietnamese: "Tôi có một chị/em gái." },
          { german: "Meine Familie wohnt in Vietnam.", vietnamese: "Gia đình tôi sống ở Việt Nam." },
          { german: "Ich habe zwei Brüder.", vietnamese: "Tôi có hai anh/em trai." },
        ]
      },
    ];

    // Try to match a pattern
    for (const pattern of patterns) {
      if (pattern.test(lastBotMessage)) {
        return { suggestions: pattern.suggestions };
      }
    }

    // Default fallback — generic conversation continuers
    return {
      suggestions: [
        { german: "Das ist interessant! Erzähl mir mehr.", vietnamese: "Thú vị quá! Kể thêm đi." },
        { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại không?" },
        { german: "Was bedeutet das?", vietnamese: "Điều đó nghĩa là gì?" },
      ]
    };
  }
}
