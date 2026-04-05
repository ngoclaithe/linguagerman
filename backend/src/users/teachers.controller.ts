import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('teachers')
export class TeachersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAllTeachers();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const teacher = await this.usersService.findTeacherBySlug(slug);
    if (!teacher) {
      throw new NotFoundException('Không tìm thấy giáo viên');
    }
    return teacher;
  }
}
