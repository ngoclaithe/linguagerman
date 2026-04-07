"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
const SYSTEM_PROMPT = `Du bist Anna Keller, eine freundliche Deutschlehrerin. Du chattest mit einem Schüler.

REGELN:
1. Antworte NUR auf Deutsch. KEINE englischen Wörter oder Übersetzungen in Klammern.
2. Antworte NUR mit einem JSON-Objekt. Kein Markdown, keine Erklärungen außerhalb des JSON.
3. Wenn der Schüler korrektes Deutsch schreibt (z.B. "hallo", "ich heiße Ngoc"), lasse "suggestion" und "explanation" LEER ("").
4. Wenn der Schüler Fehler macht oder nicht auf Deutsch schreibt, gib die Korrektur in "suggestion" und eine KURZE Erklärung auf Vietnamesisch in "explanation".
5. "nextPhrase" ist IMMER deine Antwort auf Deutsch als Anna. Beantworte die Frage des Schülers direkt.

FORMAT: {"suggestion":"","explanation":"","nextPhrase":"deine deutsche Antwort"}

BEISPIELE:
Schüler: "hallo"
{"suggestion":"","explanation":"","nextPhrase":"Hallo! Wie geht es dir?"}

Schüler: "ich bin gut"
{"suggestion":"Mir geht es gut.","explanation":"Nói 'tôi khoẻ' dùng 'Mir geht es gut', không dùng 'Ich bin gut'.","nextPhrase":"Schön! Was machst du heute?"}

Schüler: "Wie heißt du?"
{"suggestion":"","explanation":"","nextPhrase":"Ich heiße Anna. Und du?"}

Schüler: "Wo kommst du her?"
{"suggestion":"","explanation":"","nextPhrase":"Ich komme aus Berlin. Und woher kommst du?"}

Schüler: "bạn bao nhiêu tuổi"
{"suggestion":"Wie alt bist du?","explanation":"'Bạn bao nhiêu tuổi' trong tiếng Đức là 'Wie alt bist du?'","nextPhrase":"Ich bin 28 Jahre alt. Und du?"}`;
let AiService = class AiService {
    configService;
    openai;
    constructor(configService) {
        this.configService = configService;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('OPENAI_API_KEY'),
            baseURL: this.configService.get('OPENAI_BASE_URL') || 'https://api.openai.com/v1',
        });
    }
    async processGermanChat(dto) {
        const { userInput, history, topic, level } = dto;
        const messages = [
            { role: 'system', content: SYSTEM_PROMPT + `\n\nSchüler-Niveau: ${level}\nThema: ${topic}` },
        ];
        if (history && history.length > 0) {
            for (const msg of history) {
                if (msg.role === 'user') {
                    messages.push({ role: 'user', content: msg.content });
                }
                else if (msg.role === 'assistant') {
                    messages.push({ role: 'assistant', content: `{"suggestion":"","explanation":"","nextPhrase":"${msg.content.replace(/"/g, '\\"')}"}` });
                }
            }
        }
        messages.push({ role: 'user', content: userInput });
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages,
                temperature: 0.15,
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
            }
            catch (parseError) {
                console.warn("AI didn't return valid JSON. Raw output:", responseText);
                parsedResponse = {
                    suggestion: "",
                    explanation: "",
                    nextPhrase: responseText.replace(/[\{\}"]/g, '').trim() || "Entschuldigung, kannst du das wiederholen?"
                };
            }
            return parsedResponse;
        }
        catch (error) {
            console.error('OpenAI Error:', error);
            throw new common_1.InternalServerErrorException('Failed to process AI response');
        }
    }
    async translateText(text) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages: [
                    {
                        role: 'system',
                        content: 'Dịch tiếng Đức sang tiếng Việt. CHỈ viết bản dịch tiếng Việt. KHÔNG giải thích. KHÔNG viết tiếng Anh. KHÔNG viết lại câu gốc.\n\nVí dụ:\nInput: Wie heißen Sie?\nOutput: Tên của bạn là gì?\n\nInput: Ich komme aus Berlin.\nOutput: Tôi đến từ Berlin.'
                    },
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
        }
        catch (err) {
            console.error('Translate Error:', err);
            return { translation: "Lỗi dịch thuật." };
        }
    }
    async suggestReplies(dto) {
        const { history, conversationLog, topic, level } = dto;
        let conversationText = '(New conversation)';
        if (history && history.length > 0) {
            conversationText = history.map((m) => m.role === 'user' ? `Schüler: ${m.content}` : `Anna: ${m.content}`).join('\n');
        }
        else if (conversationLog && conversationLog.length > 0) {
            conversationText = conversationLog.join('\n');
        }
        const systemPrompt = `Gợi ý 3 câu tiếng Đức mà học viên có thể nói tiếp trong cuộc hội thoại. Kèm nghĩa tiếng Việt.

CHỈ trả về JSON array. KHÔNG viết tiếng Anh. KHÔNG giải thích.

Ví dụ 1:
Hội thoại: "Anna: Hallo! Wie heißt du?"
Output: [{"german":"Ich heiße Ngoc. Und Sie?","vietnamese":"Tôi tên là Ngọc. Còn bạn?"},{"german":"Guten Tag! Mein Name ist Mai.","vietnamese":"Xin chào! Tên tôi là Mai."},{"german":"Hi! Ich bin Linh.","vietnamese":"Xin chào! Tôi là Linh."}]

Ví dụ 2:
Hội thoại: "Schüler: Ich heiße Ngoc.\nAnna: Freut mich! Woher kommst du?"
Output: [{"german":"Ich komme aus Vietnam.","vietnamese":"Tôi đến từ Việt Nam."},{"german":"Ich komme aus Hanoi, Vietnam.","vietnamese":"Tôi đến từ Hà Nội, Việt Nam."},{"german":"Aus Vietnam. Und Sie?","vietnamese":"Từ Việt Nam. Còn bạn?"}]

Hội thoại hiện tại (${level}, ${topic}):
${conversationText}

Output:`;
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: 'Gợi ý 3 câu tiếng Đức kèm nghĩa tiếng Việt. JSON array.' },
                ],
                temperature: 0.3,
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
            }
            catch (parseError) {
                console.warn("suggestReplies parse failed. Raw:", responseText);
                parsedResponse = [
                    { german: "Können Sie das wiederholen?", vietnamese: "Bạn có thể nhắc lại được không?" },
                    { german: "Ich verstehe nicht.", vietnamese: "Tôi không hiểu." },
                    { german: "Wie bitte?", vietnamese: "Dạ xin lỗi, sao cơ?" }
                ];
            }
            return { suggestions: parsedResponse };
        }
        catch (error) {
            console.error('OpenAI Error:', error);
            return {
                suggestions: [
                    { german: "Ein Moment bitte...", vietnamese: "Xin chờ một lát..." },
                    { german: "Gute Frage!", vietnamese: "Câu hỏi hay đấy!" },
                    { german: "Lass mich überlegen.", vietnamese: "Để tôi suy nghĩ đã." }
                ]
            };
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map