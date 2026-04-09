"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaService = void 0;
const common_1 = require("@nestjs/common");
const personas_config_1 = require("../config/personas.config");
let PersonaService = class PersonaService {
    getPersonas() {
        return Object.values(personas_config_1.PERSONAS);
    }
    getPersonaById(id) {
        const persona = personas_config_1.PERSONAS[id];
        if (!persona) {
            throw new common_1.NotFoundException(`Persona with id ${id} not found`);
        }
        return persona;
    }
    buildSystemPrompt(personaId, topic, cefrLevel) {
        const persona = this.getPersonaById(personaId);
        return `${persona.systemPrompt}\n\nAktuelles Thema (Topic): ${topic}\nSchüler-Niveau (CEFR): ${cefrLevel}\nDu MUSST dich an diese Vorgaben halten.`;
    }
};
exports.PersonaService = PersonaService;
exports.PersonaService = PersonaService = __decorate([
    (0, common_1.Injectable)()
], PersonaService);
//# sourceMappingURL=persona.service.js.map