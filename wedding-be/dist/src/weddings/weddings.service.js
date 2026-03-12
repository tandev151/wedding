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
exports.WeddingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WeddingsService = class WeddingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.wedding.create({ data: { ...dto, eventDate: new Date(dto.eventDate) } });
    }
    async findAll() {
        return this.prisma.wedding.findMany({ include: { owner: { select: { id: true, email: true } } } });
    }
    async findOne(id) {
        const w = await this.prisma.wedding.findUnique({
            where: { id },
            include: { owner: { select: { id: true, email: true } } },
        });
        if (!w)
            throw new common_1.NotFoundException(`Wedding #${id} not found`);
        return w;
    }
    async findBySlug(slug) {
        const w = await this.prisma.wedding.findUnique({ where: { slug } });
        if (!w)
            throw new common_1.NotFoundException(`Wedding "${slug}" not found`);
        return w;
    }
    async findByOwner(ownerId) {
        const w = await this.prisma.wedding.findUnique({ where: { ownerId } });
        if (!w)
            throw new common_1.NotFoundException('You do not have a wedding yet');
        return w;
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = { ...dto };
        if (dto.eventDate)
            data.eventDate = new Date(dto.eventDate);
        return this.prisma.wedding.update({ where: { id }, data });
    }
    async updateByOwner(ownerId, dto) {
        const w = await this.findByOwner(ownerId);
        return this.update(w.id, dto);
    }
    async getRsvps(weddingId) {
        return this.prisma.rsvp.findMany({
            where: { weddingId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getMyRsvps(ownerId) {
        const w = await this.findByOwner(ownerId);
        return this.getRsvps(w.id);
    }
    async setPublished(id, isPublished) {
        await this.findOne(id);
        return this.prisma.wedding.update({ where: { id }, data: { isPublished } });
    }
    buildCsv(rsvps) {
        const header = ['requestId', 'fullName', 'phone', 'attending', 'guestCount', 'message', 'createdAt'];
        const rows = rsvps.map((r) => [
            r.requestId,
            `"${r.fullName}"`,
            r.phone,
            r.attending,
            r.guestCount,
            `"${r.message ?? ''}"`,
            r.createdAt.toISOString(),
        ]);
        return [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    }
    async exportRsvpsCsv(weddingId, res) {
        const rsvps = await this.getRsvps(weddingId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="rsvps-${weddingId}.csv"`);
        res.send(this.buildCsv(rsvps));
    }
    async exportMyRsvpsCsv(ownerId, res) {
        const w = await this.findByOwner(ownerId);
        return this.exportRsvpsCsv(w.id, res);
    }
};
exports.WeddingsService = WeddingsService;
exports.WeddingsService = WeddingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WeddingsService);
//# sourceMappingURL=weddings.service.js.map