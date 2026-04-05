import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('manage')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  findManaged(
    @Request() req,
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ) {
    return this.coursesService.findAll(+skip, +take, req.user);
  }

  @Get()
  findAll(@Query('skip') skip: number = 0, @Query('take') take: number = 10) {
    return this.coursesService.findAll(+skip, +take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  create(@Request() req, @Body() createCourseDto: any) {
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCourseDto: any,
  ) {
    return this.coursesService.update(id, updateCourseDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  remove(@Request() req, @Param('id') id: string) {
    return this.coursesService.remove(id, req.user);
  }
}
