import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole, OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  async getAllOrders(@Request() req) {
    return this.ordersService.getAllOrders(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body('courseIds') courseIds: string[]) {
    return this.ordersService.createOrder(req.user.sub, courseIds);
  }

  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  async getMyOrders(@Request() req) {
    return this.ordersService.getMyOrders(req.user.sub);
  }

  @Post(':id/complete')
  @UseGuards(JwtAuthGuard)
  async complete(@Param('id') id: string) {
    return this.ordersService.completeOrder(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.ordersService.removeOrder(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, (UserRole as any).TEACHER)
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.ordersService.updateOrderStatus(id, status, req.user);
  }
}
