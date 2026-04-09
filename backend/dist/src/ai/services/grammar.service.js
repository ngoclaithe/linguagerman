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
var GrammarService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let GrammarService = GrammarService_1 = class GrammarService {
    configService;
    logger = new common_1.Logger(GrammarService_1.name);
    llmUrl;
    constructor(configService) {
        this.configService = configService;
        this.llmUrl = this.configService.get('LLM_SERVER_URL') || 'http://localhost:8000';
    }
    async checkGrammar(text, cefr) {
        try {
            const response = await fetch(`${this.llmUrl}/grammar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, cefr }),
            });
            if (!response.ok) {
                throw new Error(`LLM grammar check failed with status ${response.status}`);
            }
            const data = await response.json();
            return {
                hasError: !!data.hasError,
                corrections: data.corrections || [],
            };
        }
        catch (error) {
            this.logger.error(`Error checking grammar: ${error.message}`);
            return { hasError: false, corrections: [] };
        }
    }
};
exports.GrammarService = GrammarService;
exports.GrammarService = GrammarService = GrammarService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GrammarService);
//# sourceMappingURL=grammar.service.js.map