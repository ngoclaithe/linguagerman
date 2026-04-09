import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiGateway } from './ai.gateway';
import { ContextService } from './services/context.service';
import { PersonaService } from './services/persona.service';
import { ChatService } from './services/chat.service';
import { SuggestionService } from './services/suggestion.service';
import { GrammarService } from './services/grammar.service';

@Module({
  controllers: [AiController, AiGateway],
  providers: [
    ContextService,
    PersonaService,
    ChatService,
    SuggestionService,
    GrammarService,
  ],
  exports: [PersonaService],
})
export class AiModule {}
