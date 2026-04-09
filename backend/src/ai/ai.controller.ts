import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PersonaService } from './services/persona.service';
import { ContextService } from './services/context.service';
import { SuggestionService } from './services/suggestion.service';
import { randomUUID } from 'crypto';
import translate from 'google-translate-api-x';

@Controller('ai')
export class AiController {
  constructor(
    private readonly personaService: PersonaService,
    private readonly contextService: ContextService,
    private readonly suggestionService: SuggestionService,
  ) {}

  @Get('personas')
  getPersonas() {
    return this.personaService.getPersonas();
  }

  @Post('session/start')
  async startSession(@Body() body: any) {
    const { personaId, topic, cefrLevel, userId } = body;
    const persona = this.personaService.getPersonaById(personaId);
    const sessionId = randomUUID();
    
    // Simulate initial suggestions based on topic
    const suggestions = await this.suggestionService.getSuggestions("Hallo! Lass uns anfangen.", topic, cefrLevel);
    
    // Default greeting from persona
    const openingMessage = `Hallo! Ich bin ${persona.name}. Lass uns über ${topic} sprechen.`;
    
    // Save opening to context
    await this.contextService.appendContext(userId, sessionId, { role: 'assistant', content: openingMessage });

    return {
      sessionId,
      openingMessage,
      suggestions: suggestions.length > 0 ? suggestions : [
        { german: "Hallo!", vietnamese: "Xin chào!" },
        { german: "Wie geht's?", vietnamese: "Bạn khỏe không?" },
        { german: "Ja, gerne.", vietnamese: "Vâng, sẵn lòng." }
      ],
    };
  }

  @Get('session/:sessionId/history')
  async getHistory(@Param('sessionId') sessionId: string, @Body('userId') userId: string) {
    // Note: User ID ideally comes from Auth Guard / Request, but keeping body simple for now
    return this.contextService.getContext(userId || 'default-user', sessionId);
  }

  @Post('translate')
  async translateText(@Body('text') text: string) {
    try {
      const res = await translate(text, { to: 'vi' });
      return { translation: res.text };
    } catch (error) {
      return { translation: null, error: error.message };
    }
  }
}
