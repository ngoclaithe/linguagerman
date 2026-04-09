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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiGateway = void 0;
const common_1 = require("@nestjs/common");
const context_service_1 = require("./services/context.service");
const persona_service_1 = require("./services/persona.service");
const chat_service_1 = require("./services/chat.service");
const suggestion_service_1 = require("./services/suggestion.service");
const grammar_service_1 = require("./services/grammar.service");
let AiGateway = class AiGateway {
    contextService;
    personaService;
    chatService;
    suggestionService;
    grammarService;
    constructor(contextService, personaService, chatService, suggestionService, grammarService) {
        this.contextService = contextService;
        this.personaService = personaService;
        this.chatService = chatService;
        this.suggestionService = suggestionService;
        this.grammarService = grammarService;
    }
    async handleMessage(body, res) {
        const { sessionId, userId, message, personaId, topic, cefrLevel } = body;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        const writeEvent = (event, data) => {
            res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
        };
        try {
            await this.contextService.appendContext(userId, sessionId, { role: 'user', content: message });
            const context = await this.contextService.getContext(userId, sessionId);
            const systemPrompt = this.personaService.buildSystemPrompt(personaId, topic, cefrLevel);
            let grammarPromise = this.grammarService.checkGrammar(message, cefrLevel);
            let suggestionsPromise = this.suggestionService.getSuggestions("...", topic, cefrLevel);
            const chatStream = await this.chatService.streamChat(context, systemPrompt);
            let fullMessage = '';
            for await (const chunk of chatStream) {
                if (chunk.includes('[DONE]'))
                    break;
                const lines = chunk.split('\n').filter(l => l.trim() !== '');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.substring(6);
                        if (dataStr !== '[DONE]') {
                            try {
                                const dataObj = JSON.parse(dataStr);
                                const token = dataObj.token;
                                if (token) {
                                    fullMessage += token;
                                    writeEvent('chat:token', { token });
                                }
                            }
                            catch (e) { }
                        }
                    }
                }
            }
            writeEvent('chat:done', { fullMessage });
            await this.contextService.appendContext(userId, sessionId, { role: 'assistant', content: fullMessage });
            suggestionsPromise = this.suggestionService.getSuggestions(fullMessage, topic, cefrLevel);
            const [grammarResult, suggestionsResult] = await Promise.allSettled([grammarPromise, suggestionsPromise]);
            if (grammarResult.status === 'fulfilled') {
                writeEvent('grammar', grammarResult.value);
            }
            if (suggestionsResult.status === 'fulfilled') {
                writeEvent('suggestions', { items: suggestionsResult.value });
            }
        }
        catch (err) {
            writeEvent('error', { message: 'Internal Server Error' });
        }
        finally {
            res.end();
        }
    }
};
exports.AiGateway = AiGateway;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AiGateway.prototype, "handleMessage", null);
exports.AiGateway = AiGateway = __decorate([
    (0, common_1.Controller)('ai/message'),
    __metadata("design:paramtypes", [context_service_1.ContextService,
        persona_service_1.PersonaService,
        chat_service_1.ChatService,
        suggestion_service_1.SuggestionService,
        grammar_service_1.GrammarService])
], AiGateway);
//# sourceMappingURL=ai.gateway.js.map