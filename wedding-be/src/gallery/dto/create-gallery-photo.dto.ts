import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGalleryPhotoDto {
  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  alt?: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
