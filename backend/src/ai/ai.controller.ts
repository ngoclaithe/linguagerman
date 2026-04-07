import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatGermanDto } from './dto/chat-german.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat/german')
  async chatGerman(@Body() chatDto: ChatGermanDto) {
    return await this.aiService.processGermanChat(chatDto);
  }

  @Post('translate')
  async translate(@Body() body: { text: string }) {
    return await this.aiService.translateText(body.text);
  }

  @Post('chat/suggest-replies')
  async suggestReplies(@Body() body: any) {
    return await this.aiService.suggestReplies(body);
  }
}
