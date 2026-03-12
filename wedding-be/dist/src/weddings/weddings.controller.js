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
exports.WeddingsController = void 0;
const common_1 = require("@nestjs/common");
const weddings_service_1 = require("./weddings.service");
const create_wedding_dto_1 = require("./dto/create-wedding.dto");
const update_wedding_dto_1 = require("./dto/update-wedding.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const client_1 = require("@prisma/client");
let WeddingsController = class WeddingsController {
    weddingsService;
    constructor(weddingsService) {
        this.weddingsService = weddingsService;
    }
    getMyWedding(user) {
        return this.weddingsService.findByOwner(user.id);
    }
    updateMyWedding(user, dto) {
        return this.weddingsService.updateByOwner(user.id, dto);
    }
    getMyRsvps(user) {
        return this.weddingsService.getMyRsvps(user.id);
    }
    exportMyRsvps(user, res) {
        return this.weddingsService.exportMyRsvpsCsv(user.id, res);
    }
    create(dto) {
        return this.weddingsService.create(dto);
    }
    findAll() {
        return this.weddingsService.findAll();
    }
    findOne(id) {
        return this.weddingsService.findOne(id);
    }
    update(id, dto) {
        return this.weddingsService.update(id, dto);
    }
    getRsvps(id) {
        return this.weddingsService.getRsvps(id);
    }
    exportRsvps(id, res) {
        return this.weddingsService.exportRsvpsCsv(id, res);
    }
    publish(id) {
        return this.weddingsService.setPublished(id, true);
    }
    unpublish(id) {
        return this.weddingsService.setPublished(id, false);
    }
};
exports.WeddingsController = WeddingsController;
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "getMyWedding", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_wedding_dto_1.UpdateWeddingDto]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "updateMyWedding", null);
__decorate([
    (0, common_1.Get)('me/rsvps'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "getMyRsvps", null);
__decorate([
    (0, common_1.Get)('me/rsvps/export'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLIENT),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "exportMyRsvps", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wedding_dto_1.CreateWeddingDto]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_wedding_dto_1.UpdateWeddingDto]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(':id/rsvps'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "getRsvps", null);
__decorate([
    (0, common_1.Get)(':id/rsvps/export'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "exportRsvps", null);
__decorate([
    (0, common_1.Patch)(':id/publish'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "publish", null);
__decorate([
    (0, common_1.Delete)(':id/publish'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WeddingsController.prototype, "unpublish", null);
exports.WeddingsController = WeddingsController = __decorate([
    (0, common_1.Controller)('weddings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [weddings_service_1.WeddingsService])
], WeddingsController);
//# sourceMappingURL=weddings.controller.js.map