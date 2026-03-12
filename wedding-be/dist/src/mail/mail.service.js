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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mail_constants_1 = require("./mail.constants");
const mail_templates_1 = require("./templates/mail-templates");
let MailService = MailService_1 = class MailService {
    transporter;
    mailFrom;
    logger = new common_1.Logger(MailService_1.name);
    constructor(transporter, mailFrom) {
        this.transporter = transporter;
        this.mailFrom = mailFrom;
    }
    async sendRaw(options) {
        try {
            const info = await this.transporter.sendMail({
                from: this.mailFrom,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
            });
            this.logger.debug?.(`Sent mail to ${options.to} with id ${info.messageId}`);
        }
        catch (error) {
            this.logger.error(`Failed to send mail to ${options.to}`, error instanceof Error ? error.stack : undefined);
            throw new common_1.InternalServerErrorException('Không gửi được email, vui lòng thử lại sau.');
        }
    }
    async sendTemplate(options) {
        const template = (0, mail_templates_1.buildMailTemplate)(options.type, options.payload);
        await this.sendRaw({
            to: options.to,
            subject: template.subject,
            html: template.html,
            text: template.text,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mail_constants_1.MAIL_TRANSPORTER)),
    __param(1, (0, common_1.Inject)(mail_constants_1.MAIL_FROM)),
    __metadata("design:paramtypes", [Object, String])
], MailService);
//# sourceMappingURL=mail.service.js.map