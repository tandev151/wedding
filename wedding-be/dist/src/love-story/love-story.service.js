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
exports.LoveStoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const weddings_service_1 = require("../weddings/weddings.service");
let LoveStoryService = class LoveStoryService {
    prisma;
    weddingsService;
    constructor(prisma, weddingsService) {
        this.prisma = prisma;
        this.weddingsService = weddingsService;
    }
    async getWeddingId(ownerId) {
        const wedding = await this.weddingsService.findByOwner(ownerId);
        return wedding.id;
    }
    async assertOwnership(ownerId, eventId) {
        const weddingId = await this.getWeddingId(ownerId);
        const event = await this.prisma.loveStoryEvent.findUnique({ where: { id: eventId } });
        if (!event)
            throw new common_1.NotFoundException(`Love story event #${eventId} not found`);
        if (event.weddingId !== weddingId)
            throw new common_1.ForbiddenException();
        return event;
    }
    async findAll(ownerId) {
        const weddingId = await this.getWeddingId(ownerId);
        return this.prisma.loveStoryEvent.findMany({
            where: { weddingId },
            orderBy: { order: 'asc' },
        });
    }
    async create(ownerId, dto) {
        const weddingId = await this.getWeddingId(ownerId);
        return this.prisma.loveStoryEvent.create({ data: { ...dto, weddingId } });
    }
    async update(ownerId, eventId, dto) {
        await this.assertOwnership(ownerId, eventId);
        return this.prisma.loveStoryEvent.update({ where: { id: eventId }, data: dto });
    }
    async remove(ownerId, eventId) {
        await this.assertOwnership(ownerId, eventId);
        return this.prisma.loveStoryEvent.delete({ where: { id: eventId } });
    }
};
exports.LoveStoryService = LoveStoryService;
exports.LoveStoryService = LoveStoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        weddings_service_1.WeddingsService])
], LoveStoryService);
//# sourceMappingURL=love-story.service.js.map