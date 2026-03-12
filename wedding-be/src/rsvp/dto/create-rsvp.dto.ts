import { IsString, IsEnum, IsInt, IsOptional, Min, IsEmail } from 'class-validator';
import { AttendanceStatus } from '@prisma/client';

export class CreateRsvpDto {
  @IsString() weddingSlug: string;
  @IsString() fullName: string;
  @IsString() phone: string;
  @IsEmail() @IsOptional() email?: string;
  @IsEnum(AttendanceStatus) attending: AttendanceStatus;
  @IsInt() @Min(1) guestCount: number;
  @IsString() @IsOptional() message?: string;
}
