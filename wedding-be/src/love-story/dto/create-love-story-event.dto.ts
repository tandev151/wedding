import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLoveStoryEventDto {
  @IsString()
  dateLabel: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @IsOptional()
  order?: number;
}
