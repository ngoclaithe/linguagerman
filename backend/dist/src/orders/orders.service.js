"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(userId, courseIds) {
        const courses = await this.prisma.course.findMany({
            where: { id: { in: courseIds } },
        });
        const totalPrice = courses.reduce((sum, course) => sum + course.price, 0);
        return this.prisma.order.create({
            data: {
                userId,
                totalPrice,
                status: 'PENDING',
                items: {
                    create: courses.map((course) => ({
                        courseId: course.id,
                        price: course.price,
                    })),
                },
            },
            include: { items: true },
        });
    }
    async getMyOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { items: { include: { course: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAllOrders(user) {
        const isTeacher = user.role === 'TEACHER';
        const teacherId = user.sub;
        const where = isTeacher
            ? { items: { some: { course: { teacherId } } } }
            : {};
        return this.prisma.order.findMany({
            where,
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: {
                    where: isTeacher ? { course: { teacherId } } : {},
                    include: { course: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async completeOrder(orderId) {
        const orderExists = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        if (!orderExists) {
            throw new Error('Order not found');
        }
        if (orderExists.status === 'COMPLETED') {
            return orderExists;
        }
        return this.prisma.$transaction(async (tx) => {
            const order = await tx.order.update({
                where: { id: orderId },
                data: { status: 'COMPLETED' },
                include: { items: true },
            });
            await Promise.all(order.items.map((item) => tx.enrollment.upsert({
                where: {
                    userId_courseId: {
                        userId: order.userId,
                        courseId: item.courseId,
                    },
                },
                update: {},
                create: {
                    userId: order.userId,
                    courseId: item.courseId,
                    progress: 0,
                },
            })));
            return order;
        });
    }
    async updateOrderStatus(orderId, status, user) {
        const isTeacher = user.role === 'TEACHER';
        if (isTeacher) {
            const order = await this.prisma.order.findFirst({
                where: {
                    id: orderId,
                    items: { some: { course: { teacherId: user.sub } } },
                },
            });
            if (!order) {
                throw new Error('Unauthorized to update this order');
            }
        }
        if (status === client_1.OrderStatus.COMPLETED) {
            return this.completeOrder(orderId);
        }
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
    async removeOrder(orderId) {
        return this.prisma.order.delete({
            where: { id: orderId },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map