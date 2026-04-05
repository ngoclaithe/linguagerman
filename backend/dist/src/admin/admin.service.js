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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats(user) {
        const isTeacher = user.role === 'TEACHER';
        const teacherId = user.sub;
        const where = isTeacher ? { teacherId } : {};
        const orderWhere = isTeacher
            ? { items: { some: { course: { teacherId } } } }
            : {};
        const userCount = isTeacher
            ? await this.prisma.user.count({
                where: {
                    enrollments: { some: { course: { teacherId } } },
                },
            })
            : await this.prisma.user.count();
        const courseCount = await this.prisma.course.count({ where });
        const salesCount = await this.prisma.order.count({
            where: {
                status: 'COMPLETED',
                ...orderWhere,
            },
        });
        const recentOrders = await this.prisma.order.findMany({
            where: orderWhere,
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    where: isTeacher ? { course: { teacherId } } : {},
                    include: { course: true },
                },
            },
        });
        return {
            stats: {
                totalUsers: userCount,
                totalCourses: courseCount,
                totalSales: salesCount,
            },
            recentOrders,
        };
    }
    async getAllUsers(user) {
        const isTeacher = user.role === 'TEACHER';
        const teacherId = user.sub || user.id;
        return this.prisma.user.findMany({
            where: {
                role: 'STUDENT',
                ...(isTeacher
                    ? { enrollments: { some: { course: { teacherId } } } }
                    : {}),
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                enrollments: {
                    where: isTeacher ? { course: { teacherId } } : {},
                    select: {
                        course: {
                            select: { title: true },
                        },
                    },
                },
                _count: {
                    select: {
                        enrollments: isTeacher
                            ? {
                                where: { course: { teacherId } },
                            }
                            : true,
                    },
                },
            },
        });
    }
    async getTeachers(user) {
        const isTeacher = user.role === 'TEACHER';
        const teacherId = user.sub;
        return this.prisma.user.findMany({
            where: {
                role: 'TEACHER',
                ...(isTeacher ? { id: teacherId } : {}),
            },
            select: {
                id: true,
                email: true,
                name: true,
                avatar: true,
                slug: true,
                bio: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        courses: true,
                    },
                },
            },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map