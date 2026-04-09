"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const ai_controller_1 = require("./ai.controller");
const ai_gateway_1 = require("./ai.gateway");
const context_service_1 = require("./services/context.service");
const persona_service_1 = require("./services/persona.service");
const chat_service_1 = require("./services/chat.service");
const suggestion_service_1 = require("./services/suggestion.service");
const grammar_service_1 = require("./services/grammar.service");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        controllers: [ai_controller_1.AiController, ai_gateway_1.AiGateway],
        providers: [
            context_service_1.ContextService,
            persona_service_1.PersonaService,
            chat_service_1.ChatService,
            suggestion_service_1.SuggestionService,
            grammar_service_1.GrammarService,
        ],
        exports: [persona_service_1.PersonaService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map