"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGalleryPhotoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_gallery_photo_dto_1 = require("./create-gallery-photo.dto");
class UpdateGalleryPhotoDto extends (0, mapped_types_1.PartialType)(create_gallery_photo_dto_1.CreateGalleryPhotoDto) {
}
exports.UpdateGalleryPhotoDto = UpdateGalleryPhotoDto;
//# sourceMappingURL=update-gallery-photo.dto.js.map