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
exports.RsvpService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let RsvpService = class RsvpService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async submit(dto) {
        const wedding = await this.prisma.wedding.findUnique({ where: { slug: dto.weddingSlug } });
        if (!wedding)
            throw new common_1.NotFoundException(`Wedding "${dto.weddingSlug}" not found`);
        const { weddingSlug, email, ...rest } = dto;
        const rsvp = await this.prisma.rsvp.create({
            data: { ...rest, weddingId: wedding.id },
        });
        if (email) {
            this.mailService
                .sendTemplate({
                to: email,
                type: 'rsvpConfirmation',
                payload: { coupleName: wedding.coupleName ?? undefined },
            })
                .catch(() => {
            });
        }
        return rsvp;
    }
};
exports.RsvpService = RsvpService;
exports.RsvpService = RsvpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], RsvpService);
//# sourceMappingURL=rsvp.service.js.map