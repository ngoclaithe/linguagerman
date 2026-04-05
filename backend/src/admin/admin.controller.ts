import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('sensei-secret')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('stats')
  async getStats(@Request() req) {
    return this.adminService.getDashboardStats(req.user);
  }

  @Get('users')
  async getUsers(@Request() req) {
    return this.adminService.getAllUsers(req.user);
  }

  @Get('teachers')
  async getTeachers(@Request() req) {
    return this.adminService.getTeachers(req.user);
  }
}
