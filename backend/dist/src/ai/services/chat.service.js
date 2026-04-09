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
var ChatService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ChatService = ChatService_1 = class ChatService {
    configService;
    logger = new common_1.Logger(ChatService_1.name);
    llmUrl;
    constructor(configService) {
        this.configService = configService;
        this.llmUrl = this.configService.get('LLM_SERVER_URL') || 'http://localhost:8000';
    }
    async streamChat(messages, systemPrompt) {
        try {
            const response = await fetch(`${this.llmUrl}/chat/stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages, system_prompt: systemPrompt }),
            });
            if (!response.body) {
                throw new Error('No response body from LLM');
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            return async function* () {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done)
                        break;
                    const chunk = decoder.decode(value, { stream: true });
                    yield chunk;
                }
            }();
        }
        catch (error) {
            this.logger.error(`Failed to stream chat: ${error.message}`);
            throw error;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = ChatService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatService);
//# sourceMappingURL=chat.service.js.map