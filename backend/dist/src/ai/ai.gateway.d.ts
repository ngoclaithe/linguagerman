import type { Response } from 'express';
import { ContextService } from './services/context.service';
import { PersonaService } from './services/persona.service';
import { ChatService } from './services/chat.service';
import { SuggestionService } from './services/suggestion.service';
import { GrammarService } from './services/grammar.service';
export declare class AiGateway {
    private readonly contextService;
    private readonly personaService;
    private readonly chatService;
    private readonly suggestionService;
    private readonly grammarService;
    constructor(contextService: ContextService, personaService: PersonaService, chatService: ChatService, suggestionService: SuggestionService, grammarService: GrammarService);
    handleMessage(body: any, res: Response): Promise<void>;
}
