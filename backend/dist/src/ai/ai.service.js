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
                temperature: 0.1,
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
                    nextPhrase: responseText.replace(/[\{\}]/g, '').trim() || "Entschuldigung, ich habe dich nicht verstanden."
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
        }
        catch (err) {
            console.error('Translate Error:', err);
            return { translation: "Lỗi dịch thuật." };
        }
    }
    async suggestReplies(dto) {
        const { conversationLog, topic, level } = dto;
        const systemPrompt = `You suggest German phrases a student could say next in a conversation. Output ONLY a JSON array of 3 objects. No markdown, no explanation.

Each object has "german" (the German phrase) and "vietnamese" (Vietnamese translation). NEVER use English.

# EXAMPLES

Conversation: "Lehrerin: Hallo! Wie heißt du?"
Output: [{"german":"Ich heiße Ngoc. Und Sie?","vietnamese":"Tôi tên là Ngọc. Còn bạn?"},{"german":"Guten Tag! Mein Name ist Ngoc.","vietnamese":"Chào buổi chiều! Tên tôi là Ngọc."},{"german":"Hallo! Ich bin Ngoc.","vietnamese":"Xin chào! Tôi là Ngọc."}]

Conversation: "Lehrerin: Wie alt bist du?"
Output: [{"german":"Ich bin 25 Jahre alt.","vietnamese":"Tôi 25 tuổi."},{"german":"Ich bin zwanzig Jahre alt. Und Sie?","vietnamese":"Tôi 20 tuổi. Còn bạn?"},{"german":"Darf ich fragen, wie alt Sie sind?","vietnamese":"Cho tôi hỏi, bạn bao nhiêu tuổi?"}]

# YOUR TURN
CEFR Level: ${level}
Topic: ${topic}
Conversation:
${conversationLog && conversationLog.length > 0 ? conversationLog.join('\n') : '(New conversation)'}

Output ONLY the JSON array:`;
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: 'Suggest 3 German replies with Vietnamese translations. JSON array ONLY.' },
                ],
                temperature: 0.3,
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
            }
            catch (parseError) {
                console.warn("AI didn't return valid JSON array. Raw output:", responseText);
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
            return { suggestions: [
                    { german: "Ein Moment bitte...", vietnamese: "Xin chờ một lát..." },
                    { german: "Gute Frage!", vietnamese: "Câu hỏi hay đấy!" },
                    { german: "Lass mich überlegen.", vietnamese: "Để tôi suy nghĩ đã." }
                ] };
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map