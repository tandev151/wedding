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
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const weddings_module_1 = require("./weddings/weddings.module");
const rsvp_module_1 = require("./rsvp/rsvp.module");
const event_summary_module_1 = require("./event-summary/event-summary.module");
const gallery_module_1 = require("./gallery/gallery.module");
const love_story_module_1 = require("./love-story/love-story.module");
const admin_module_1 = require("./admin/admin.module");
const upload_module_1 = require("./upload/upload.module");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            weddings_module_1.WeddingsModule,
            rsvp_module_1.RsvpModule,
            event_summary_module_1.EventSummaryModule,
            gallery_module_1.GalleryModule,
            love_story_module_1.LoveStoryModule,
            admin_module_1.AdminModule,
            upload_module_1.UploadModule,
            mail_module_1.MailModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map