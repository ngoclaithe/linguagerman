import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ContextService } from './services/context.service';
import { PersonaService } from './services/persona.service';
import { ChatService } from './services/chat.service';
import { SuggestionService } from './services/suggestion.service';
import { GrammarService } from './services/grammar.service';

@Controller('ai/message')
export class AiGateway {
  constructor(
    private readonly contextService: ContextService,
    private readonly personaService: PersonaService,
    private readonly chatService: ChatService,
    private readonly suggestionService: SuggestionService,
    private readonly grammarService: GrammarService,
  ) {}

  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    const { sessionId, userId, message, personaId, topic, cefrLevel } = body;

    // Set up headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const writeEvent = (event: string, data: any) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    try {
      // 1. Setup Context
      await this.contextService.appendContext(userId, sessionId, { role: 'user', content: message });
      const context = await this.contextService.getContext(userId, sessionId);
      const systemPrompt = this.personaService.buildSystemPrompt(personaId, topic, cefrLevel);

      // 2. Run background tasks Promise.allSettled
      // Fire grammar check and suggestion generation simultaneously
      let grammarPromise = this.grammarService.checkGrammar(message, cefrLevel);
      let suggestionsPromise = this.suggestionService.getSuggestions("...", topic, cefrLevel); // Will update after chat

      // 3. Stream Chat
      const chatStream = await this.chatService.streamChat(context, systemPrompt);
      let fullMessage = '';

      for await (const chunk of chatStream) {
        if (chunk.includes('[DONE]')) break;
        // Parse the SSE chunk from LLM server
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
              } catch (e) {}
            }
          }
        }
      }

      writeEvent('chat:done', { fullMessage });
      await this.contextService.appendContext(userId, sessionId, { role: 'assistant', content: fullMessage });

      // 4. Resolve Background Tasks & Send
      // Only now generate suggestion based on the full AI message
      suggestionsPromise = this.suggestionService.getSuggestions(fullMessage, topic, cefrLevel);
      
      const [grammarResult, suggestionsResult] = await Promise.allSettled([grammarPromise, suggestionsPromise]);

      if (grammarResult.status === 'fulfilled') {
        writeEvent('grammar', grammarResult.value);
      }
      if (suggestionsResult.status === 'fulfilled') {
        writeEvent('suggestions', { items: suggestionsResult.value });
      }

    } catch (err) {
      writeEvent('error', { message: 'Internal Server Error' });
    } finally {
      res.end();
      // TODO: Async Prisma save here if needed
    }
  }
}
