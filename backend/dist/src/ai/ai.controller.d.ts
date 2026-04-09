import { PersonaService } from './services/persona.service';
import { ContextService } from './services/context.service';
import { SuggestionService } from './services/suggestion.service';
export declare class AiController {
    private readonly personaService;
    private readonly contextService;
    private readonly suggestionService;
    constructor(personaService: PersonaService, contextService: ContextService, suggestionService: SuggestionService);
    getPersonas(): import("./config/personas.config").Persona[];
    startSession(body: any): Promise<{
        sessionId: `${string}-${string}-${string}-${string}-${string}`;
        openingMessage: string;
        suggestions: string[] | {
            german: string;
            vietnamese: string;
        }[];
    }>;
    getHistory(sessionId: string, userId: string): Promise<import("./services/context.service").ChatMessage[]>;
    translateText(text: string): Promise<{
        translation: any;
        error?: undefined;
    } | {
        translation: null;
        error: any;
    }>;
}
