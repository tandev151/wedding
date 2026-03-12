import { CreateWeddingDto } from './create-wedding.dto';
declare const UpdateWeddingDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateWeddingDto, "ownerId">>>;
export declare class UpdateWeddingDto extends UpdateWeddingDto_base {
}
export {};
