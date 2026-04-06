import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() data: any) {
    return this.flashcardsService.create(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: any) {
    return this.flashcardsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.flashcardsService.remove(id);
  }

  @Post('toggle-my-list')
  @UseGuards(JwtAuthGuard)
  toggleMyList(@Request() req, @Body('flashcardId') flashcardId: string) {
    return this.flashcardsService.toggleMyList(req.user.sub, flashcardId);
  }

  @Get('my-list')
  @UseGuards(JwtAuthGuard)
  getMyList(@Request() req) {
    return this.flashcardsService.getMyList(req.user.sub);
  }

  @Get('my-progress')
  @UseGuards(JwtAuthGuard)
  getMyProgress(@Request() req) {
    return this.flashcardsService.getMyProgress(req.user.sub);
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashcardsService.findOne(id);
  }

  
  @Get()
  findAll() {
    return this.flashcardsService.findAll();
  }

  @Post('progress')
  @UseGuards(JwtAuthGuard)
  updateProgress(
    @Request() req,
    @Body('flashcardId') flashcardId: string,
    @Body('known') known: boolean,
  ) {
    return this.flashcardsService.updateProgress(
      req.user.sub,
      flashcardId,
      known,
    );
  }
}
