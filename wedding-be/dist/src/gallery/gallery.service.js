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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const weddings_service_1 = require("../weddings/weddings.service");
let GalleryService = class GalleryService {
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
    async assertOwnership(ownerId, photoId) {
        const weddingId = await this.getWeddingId(ownerId);
        const photo = await this.prisma.galleryPhoto.findUnique({ where: { id: photoId } });
        if (!photo)
            throw new common_1.NotFoundException(`Photo #${photoId} not found`);
        if (photo.weddingId !== weddingId)
            throw new common_1.ForbiddenException();
        return photo;
    }
    async findAll(ownerId) {
        const weddingId = await this.getWeddingId(ownerId);
        return this.prisma.galleryPhoto.findMany({
            where: { weddingId },
            orderBy: { order: 'asc' },
        });
    }
    async create(ownerId, dto) {
        const weddingId = await this.getWeddingId(ownerId);
        return this.prisma.galleryPhoto.create({ data: { ...dto, weddingId } });
    }
    async update(ownerId, photoId, dto) {
        await this.assertOwnership(ownerId, photoId);
        return this.prisma.galleryPhoto.update({ where: { id: photoId }, data: dto });
    }
    async remove(ownerId, photoId) {
        await this.assertOwnership(ownerId, photoId);
        return this.prisma.galleryPhoto.delete({ where: { id: photoId } });
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        weddings_service_1.WeddingsService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map