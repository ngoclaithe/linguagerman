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
var ContextService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let ContextService = ContextService_1 = class ContextService {
    configService;
    redis;
    logger = new common_1.Logger(ContextService_1.name);
    memoryFallback = new Map();
    useRedis = false;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const redisUrl = this.configService.get('REDIS_URL') || 'redis://localhost:6379';
        try {
            this.redis = new ioredis_1.Redis(redisUrl, {
                maxRetriesPerRequest: 1,
                retryStrategy: (times) => {
                    if (times > 3) {
                        this.logger.warn('Failed to connect to Redis, falling back to in-memory context');
                        this.useRedis = false;
                        return null;
                    }
                    return Math.min(times * 200, 2000);
                }
            });
            this.redis.on('ready', () => {
                this.logger.log('Connected to Redis for AI Context Management');
                this.useRedis = true;
            });
            this.redis.on('error', (err) => {
            });
        }
        catch (e) {
            this.logger.warn('Redis init failed, using memory fallback', e);
        }
    }
    onModuleDestroy() {
        if (this.redis) {
            this.redis.disconnect();
        }
    }
    async getContext(userId, sessionId) {
        const key = `context:${userId}:${sessionId}`;
        let data = null;
        if (this.useRedis) {
            try {
                data = await this.redis.get(key);
            }
            catch (e) { }
        }
        else {
            data = this.memoryFallback.get(key) ?? null;
        }
        if (data) {
            try {
                return JSON.parse(data);
            }
            catch (e) {
                return [];
            }
        }
        return [];
    }
    async appendContext(userId, sessionId, turn) {
        const key = `context:${userId}:${sessionId}`;
        const context = await this.getContext(userId, sessionId);
        context.push(turn);
        const trimmed = context.slice(-20);
        const serialized = JSON.stringify(trimmed);
        if (this.useRedis) {
            try {
                await this.redis.set(key, serialized, 'EX', 86400);
            }
            catch (e) { }
        }
        else {
            this.memoryFallback.set(key, serialized);
        }
    }
};
exports.ContextService = ContextService;
exports.ContextService = ContextService = ContextService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContextService);
//# sourceMappingURL=context.service.js.map