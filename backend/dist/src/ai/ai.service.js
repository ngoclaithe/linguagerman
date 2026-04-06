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
                model: 'Qwen/Qwen3-0.6B',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userInput },
                ],
            });
            const responseText = completion.choices[0].message.content || '{}';
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
                    nextPhrase: responseText || "..."
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
                model: 'Qwen/Qwen3-0.6B',
                messages: [
                    { role: 'system', content: 'You are a translator. Translate the given German text to Vietnamese. DO NOT include any other words or explanations, ONLY the direct translation.' },
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
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiService);
//# sourceMappingURL=ai.service.js.map