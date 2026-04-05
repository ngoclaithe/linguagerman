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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    }
    async create(data, user) {
        if (!data.slug && data.title) {
            data.slug = this.slugify(data.title);
        }
        if (user.role === 'TEACHER') {
            data.teacherId = user.sub;
        }
        return this.prisma.course.create({
            data,
            include: {
                lessons: true,
            },
        });
    }
    async findAll(skip = 0, take = 10, user) {
        const isTeacher = user?.role === 'TEACHER';
        const where = isTeacher ? { teacherId: user.sub || user.id } : {};
        return this.prisma.course.findMany({
            where,
            skip,
            take,
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                lessons: {
                    select: {
                        id: true,
                        title: true,
                        order: true,
                    },
                },
            },
        });
    }
    async findOne(idOrSlug) {
        const course = await this.prisma.course.findFirst({
            where: {
                OR: [{ id: idOrSlug }, { slug: idOrSlug }],
            },
            include: {
                lessons: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return course;
    }
    async update(id, data, user) {
        if (user.role === 'TEACHER') {
            const course = await this.prisma.course.findUnique({ where: { id } });
            if (!course || course.teacherId !== user.sub) {
                throw new Error('Unauthorized to update this course');
            }
            delete data.teacherId;
        }
        if (!data.slug && data.title) {
            data.slug = this.slugify(data.title);
        }
        return this.prisma.course.update({
            where: { id },
            data,
            include: {
                lessons: true,
            },
        });
    }
    async remove(id, user) {
        if (user.role === 'TEACHER') {
            const course = await this.prisma.course.findUnique({ where: { id } });
            if (!course || course.teacherId !== user.sub) {
                throw new Error('Unauthorized to delete this course');
            }
        }
        return this.prisma.course.delete({
            where: { id },
        });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map