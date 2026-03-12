"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoveStoryModule = void 0;
const common_1 = require("@nestjs/common");
const love_story_service_1 = require("./love-story.service");
const love_story_controller_1 = require("./love-story.controller");
const weddings_module_1 = require("../weddings/weddings.module");
let LoveStoryModule = class LoveStoryModule {
};
exports.LoveStoryModule = LoveStoryModule;
exports.LoveStoryModule = LoveStoryModule = __decorate([
    (0, common_1.Module)({
        imports: [weddings_module_1.WeddingsModule],
        controllers: [love_story_controller_1.LoveStoryController],
        providers: [love_story_service_1.LoveStoryService],
    })
], LoveStoryModule);
//# sourceMappingURL=love-story.module.js.map