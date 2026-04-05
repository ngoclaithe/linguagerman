import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get()
  async getMyProgress(@Request() req) {
    return this.progressService.getUserProgress(req.user.sub);
  }

  @Post('lesson-complete')
  async markComplete(@Request() req, @Body('lessonId') lessonId: string) {
    return this.progressService.markLessonComplete(req.user.sub, lessonId);
  }

  @Get('my-courses')
  async getMyCourses(@Request() req) {
    return this.progressService.getMyCourses(req.user.sub);
  }
}
