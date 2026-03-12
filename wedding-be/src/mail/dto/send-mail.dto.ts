import { IsEmail, IsIn, IsObject, IsOptional } from 'class-validator';

import type { MailTemplateType } from '../templates/mail-templates';

export class SendMailDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsIn(['saveDate', 'rsvpConfirmation', 'generic'])
  templateType?: MailTemplateType;

  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}

