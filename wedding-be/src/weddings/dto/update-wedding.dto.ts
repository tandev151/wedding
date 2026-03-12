import { PartialType } from '@nestjs/mapped-types';
import { CreateWeddingDto } from './create-wedding.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateWeddingDto extends PartialType(OmitType(CreateWeddingDto, ['ownerId'] as const)) {}
