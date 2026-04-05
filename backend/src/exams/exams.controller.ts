import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { Patch, Delete } from '@nestjs/common';

@Controller('exams')
@UseGuards(JwtAuthGuard)
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() data: any) {
    return this.examsService.create(data);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() data: any) {
    return this.examsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }

  @Get()
  findAll(@Request() req, @Query('courseId') courseId?: string) {
    return this.examsService.findAll(req.user, courseId);
  }

  @Get('my-results')
  getMyResults(@Request() req) {
    return this.examsService.getMyResults(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  @Post(':id/submit')
  submitResult(
    @Request() req,
    @Param('id') examId: string,
    @Body('answers') answers: any,
  ) {
    return this.examsService.submit(req.user.sub, examId, answers);
  }
}
