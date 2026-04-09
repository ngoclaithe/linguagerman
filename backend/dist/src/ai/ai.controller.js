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
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const persona_service_1 = require("./services/persona.service");
const context_service_1 = require("./services/context.service");
const suggestion_service_1 = require("./services/suggestion.service");
const crypto_1 = require("crypto");
let AiController = class AiController {
    personaService;
    contextService;
    suggestionService;
    constructor(personaService, contextService, suggestionService) {
        this.personaService = personaService;
        this.contextService = contextService;
        this.suggestionService = suggestionService;
    }
    getPersonas() {
        return this.personaService.getPersonas();
    }
    async startSession(body) {
        const { personaId, topic, cefrLevel, userId } = body;
        const persona = this.personaService.getPersonaById(personaId);
        const sessionId = (0, crypto_1.randomUUID)();
        const suggestions = await this.suggestionService.getSuggestions("Hallo! Lass uns anfangen.", topic, cefrLevel);
        const openingMessage = `Hallo! Ich bin ${persona.name}. Lass uns über ${topic} sprechen.`;
        await this.contextService.appendContext(userId, sessionId, { role: 'assistant', content: openingMessage });
        return {
            sessionId,
            openingMessage,
            suggestions: suggestions.length > 0 ? suggestions : ["Hallo!", "Wie geht's?", "Ja, gerne."],
        };
    }
    async getHistory(sessionId, userId) {
        return this.contextService.getContext(userId || 'default-user', sessionId);
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('personas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getPersonas", null);
__decorate([
    (0, common_1.Post)('session/start'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "startSession", null);
__decorate([
    (0, common_1.Get)('session/:sessionId/history'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getHistory", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [persona_service_1.PersonaService,
        context_service_1.ContextService,
        suggestion_service_1.SuggestionService])
], AiController);
//# sourceMappingURL=ai.controller.js.map