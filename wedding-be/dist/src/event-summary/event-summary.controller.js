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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSummaryController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EventSummaryController = class EventSummaryController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(slug) {
        if (!slug)
            throw new common_1.NotFoundException('slug is required');
        const wedding = await this.prisma.wedding.findUnique({
            where: { slug },
            include: {
                gallery: { orderBy: { order: 'asc' } },
                loveStory: { orderBy: { order: 'asc' } },
            },
        });
        if (!wedding)
            throw new common_1.NotFoundException(`Wedding "${slug}" not found`);
        return {
            coupleName: wedding.coupleName,
            monogram: wedding.monogram,
            heroMessage: wedding.heroMessage,
            eventDate: wedding.eventDate,
            ceremonyVenueName: wedding.ceremonyVenueName,
            ceremonyVenueAddress: wedding.ceremonyVenueAddress,
            ceremonyTime: wedding.ceremonyTime,
            venueName: wedding.venueName,
            venueAddress: wedding.venueAddress,
            receptionTime: wedding.receptionTime,
            dressCode: wedding.dressCode,
            mapUrl: wedding.mapUrl,
            groomName: wedding.groomName,
            groomFullName: wedding.groomFullName,
            groomDescription: wedding.groomDescription,
            groomImageUrl: wedding.groomImageUrl,
            groomParents: wedding.groomParents,
            groomBank: wedding.groomBank,
            groomBankAccount: wedding.groomBankAccount,
            groomBankName: wedding.groomBankName,
            brideName: wedding.brideName,
            brideFullName: wedding.brideFullName,
            brideDescription: wedding.brideDescription,
            brideImageUrl: wedding.brideImageUrl,
            brideParents: wedding.brideParents,
            brideBank: wedding.brideBank,
            brideBankAccount: wedding.brideBankAccount,
            brideBankName: wedding.brideBankName,
            videoId: wedding.videoId,
            gallery: wedding.gallery,
            loveStory: wedding.loveStory,
        };
    }
};
exports.EventSummaryController = EventSummaryController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventSummaryController.prototype, "getSummary", null);
exports.EventSummaryController = EventSummaryController = __decorate([
    (0, common_1.Controller)('v1/event-summary'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventSummaryController);
//# sourceMappingURL=event-summary.controller.js.map