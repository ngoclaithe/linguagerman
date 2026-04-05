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
exports.ExamsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExamsService = class ExamsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.exam.create({
            data: {
                ...data,
                questions: {
                    create: data.questions,
                },
            },
            include: { questions: true },
        });
    }
    async findAll(user, courseId) {
        const isAdmin = user.role === 'ADMIN';
        const isTeacher = user.role === 'TEACHER';
        return this.prisma.exam.findMany({
            where: {
                ...(courseId && { courseId }),
                ...(isTeacher &&
                    {
                        OR: [
                            { courseId: null },
                            { course: { teacherId: user.sub || user.id } },
                        ],
                    }),
                ...(!isAdmin && !isTeacher && { published: true }),
            },
            include: {
                questions: true,
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                _count: {
                    select: {
                        results: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const exam = await this.prisma.exam.findUnique({
            where: { id },
            include: { questions: true },
        });
        if (!exam)
            throw new common_1.NotFoundException('Exam not found');
        return exam;
    }
    async submit(userId, examId, answers) {
        const exam = await this.prisma.exam.findUnique({
            where: { id: examId },
            include: { questions: true },
        });
        if (!exam)
            throw new common_1.NotFoundException('Exam not found');
        let correctCount = 0;
        exam.questions.forEach((question) => {
            const userAnswer = answers[question.id]?.trim() || '';
            const correctAnswer = question.correctAnswer.trim();
            if (question.type === 'FILL') {
                if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                    correctCount++;
                }
            }
            else {
                if (userAnswer === correctAnswer) {
                    correctCount++;
                }
            }
        });
        const score = (correctCount / exam.questions.length) * 100;
        return this.prisma.examResult.create({
            data: {
                userId,
                examId,
                score,
                correctCount,
                timeSpent: 0,
            },
        });
    }
    async submitResult(userId, examId, resultData) {
        return this.prisma.examResult.create({
            data: {
                userId,
                examId,
                score: resultData.score,
                correctCount: resultData.correctCount,
                timeSpent: resultData.timeSpent,
            },
        });
    }
    async getMyResults(userId) {
        return this.prisma.examResult.findMany({
            where: { userId },
            include: { exam: true },
            orderBy: { submittedAt: 'desc' },
        });
    }
    async update(id, data) {
        const { questions, ...examData } = data;
        return this.prisma.$transaction(async (tx) => {
            const updatedExam = await tx.exam.update({
                where: { id },
                data: examData,
            });
            if (questions && Array.isArray(questions)) {
                await tx.question.deleteMany({
                    where: { examId: id },
                });
                await tx.question.createMany({
                    data: questions.map((q, idx) => ({
                        examId: id,
                        type: q.type || 'CHOICE',
                        question: q.question,
                        audioUrl: q.audioUrl || null,
                        options: Array.isArray(q.options) ? q.options : [],
                        correctAnswer: q.correctAnswer,
                        explanation: q.explanation || null,
                        order: q.order ?? idx + 1,
                    })),
                });
            }
            return tx.exam.findUnique({
                where: { id },
                include: { questions: true },
            });
        });
    }
    async remove(id) {
        return this.prisma.exam.delete({
            where: { id },
        });
    }
};
exports.ExamsService = ExamsService;
exports.ExamsService = ExamsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExamsService);
//# sourceMappingURL=exams.service.js.map