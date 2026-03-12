import { IsString, IsDateString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateWeddingDto {
  @IsString() slug: string;
  @IsString() coupleName: string;
  @IsString() @IsOptional() monogram?: string;
  @IsString() @IsOptional() heroMessage?: string;
  @IsDateString() eventDate: string;

  @IsString() @IsOptional() ceremonyVenueName?: string;
  @IsString() @IsOptional() ceremonyVenueAddress?: string;
  @IsString() @IsOptional() ceremonyTime?: string;

  @IsString() venueName: string;
  @IsString() venueAddress: string;
  @IsString() @IsOptional() receptionTime?: string;
  @IsString() dressCode: string;
  @IsString() mapUrl: string;

  @IsString() @IsOptional() groomName?: string;
  @IsString() @IsOptional() groomFullName?: string;
  @IsString() @IsOptional() groomDescription?: string;
  @IsString() @IsOptional() groomImageUrl?: string;
  @IsString() @IsOptional() groomParents?: string;
  @IsString() @IsOptional() groomBank?: string;
  @IsString() @IsOptional() groomBankAccount?: string;
  @IsString() @IsOptional() groomBankName?: string;

  @IsString() @IsOptional() brideName?: string;
  @IsString() @IsOptional() brideFullName?: string;
  @IsString() @IsOptional() brideDescription?: string;
  @IsString() @IsOptional() brideImageUrl?: string;
  @IsString() @IsOptional() brideParents?: string;
  @IsString() @IsOptional() brideBank?: string;
  @IsString() @IsOptional() brideBankAccount?: string;
  @IsString() @IsOptional() brideBankName?: string;

  @IsString() @IsOptional() videoId?: string;

  @IsBoolean() @IsOptional() isPublished?: boolean;
  @IsInt() ownerId: number;
}
