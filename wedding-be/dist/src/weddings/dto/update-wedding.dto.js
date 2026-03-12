"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWeddingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_wedding_dto_1 = require("./create-wedding.dto");
const mapped_types_2 = require("@nestjs/mapped-types");
class UpdateWeddingDto extends (0, mapped_types_1.PartialType)((0, mapped_types_2.OmitType)(create_wedding_dto_1.CreateWeddingDto, ['ownerId'])) {
}
exports.UpdateWeddingDto = UpdateWeddingDto;
//# sourceMappingURL=update-wedding.dto.js.map