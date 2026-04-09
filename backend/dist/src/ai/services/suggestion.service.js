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
var SuggestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SuggestionService = SuggestionService_1 = class SuggestionService {
    configService;
    logger = new common_1.Logger(SuggestionService_1.name);
    llmUrl;
    constructor(configService) {
        this.configService = configService;
        this.llmUrl = this.configService.get('LLM_SERVER_URL') || 'http://localhost:8000';
    }
    async getSuggestions(lastMessage, topic, cefr) {
        try {
            const response = await fetch(`${this.llmUrl}/suggest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ last_ai_message: lastMessage, topic, cefr }),
            });
            if (!response.ok) {
                throw new Error(`LLM suggest failed with status ${response.status}`);
            }
            const data = await response.json();
            return data.suggestions || [];
        }
        catch (error) {
            this.logger.error(`Error generating suggestions: ${error.message}`);
            return [];
        }
    }
};
exports.SuggestionService = SuggestionService;
exports.SuggestionService = SuggestionService = SuggestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SuggestionService);
//# sourceMappingURL=suggestion.service.js.map