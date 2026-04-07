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
You MUST output ONLY a pure, valid JSON object. No explanation, no markdown tags like \`\`\`json. 

STUDENT'S MESSAGE: "${userInput}"
CEFR LEVEL: ${level}
TOPIC: ${topic}

CONVERSATION LOG:
${conversationLog.length > 0 ? conversationLog.join('\n') : '(New conversation)'}

INSTRUCTIONS:
1. 'nextPhrase': You MUST reply to the student in GERMAN ONLY to continue the conversation. NEVER include English or Vietnamese translations in parentheses. ONLY 100% GERMAN.
2. 'suggestion': If the student made a grammar/spelling mistake, or spoke in a non-German language, provide the corrected/translated German sentence here. IF THE STUDENT'S MESSAGE IS VALID AND CORRECT GERMAN (e.g. "hallo", "danke"), YOU MUST LEAVE THIS EMPTY "".
3. 'explanation': If you provided a 'suggestion', write a brief explanation in Vietnamese here. Otherwise, leave it EMPTY "".

STRICT JSON FORMAT REQUIRED:
{"suggestion":"","explanation":"","nextPhrase":"<German response only>"}
`;
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'mistralai/Mistral-7B-Instruct-v0.3',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userInput },
                ],
                temperature: 0.2,
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
                    { role: 'system', content: 'You are a translator. Translate the given German text to Vietnamese. OUTPUT ONLY THE DIRECT VIETNAMESE TRANSLATION. NEVER explain. NEVER write the original text. NEVER write English.' },
                    { role: 'user', content: text },
                ],
                temperature: 0.3,
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