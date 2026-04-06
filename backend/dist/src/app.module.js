"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const courses_module_1 = require("./courses/courses.module");
const lessons_module_1 = require("./lessons/lessons.module");
const exams_module_1 = require("./exams/exams.module");
const questions_module_1 = require("./questions/questions.module");
const flashcards_module_1 = require("./flashcards/flashcards.module");
const orders_module_1 = require("./orders/orders.module");
const prisma_module_1 = require("./prisma/prisma.module");
const progress_module_1 = require("./progress/progress.module");
const admin_module_1 = require("./admin/admin.module");
const upload_module_1 = require("./upload/upload.module");
const streaming_module_1 = require("./streaming/streaming.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const quests_module_1 = require("./quests/quests.module");
const leaderboard_module_1 = require("./leaderboard/leaderboard.module");
const ai_module_1 = require("./ai/ai.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                useFactory: (configService) => {
                    const expiresIn = configService.get('JWT_EXPIRES_IN') || '7d';
                    return {
                        secret: configService.get('JWT_SECRET'),
                        signOptions: { expiresIn },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            courses_module_1.CoursesModule,
            lessons_module_1.LessonsModule,
            exams_module_1.ExamsModule,
            questions_module_1.QuestionsModule,
            flashcards_module_1.FlashcardsModule,
            orders_module_1.OrdersModule,
            progress_module_1.ProgressModule,
            admin_module_1.AdminModule,
            upload_module_1.UploadModule,
            streaming_module_1.StreamingModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'public'),
                serveRoot: '/',
            }),
            quests_module_1.QuestsModule,
            leaderboard_module_1.LeaderboardModule,
            ai_module_1.AiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map