import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() body: SendMailDto) {
    const templateType = body.templateType ?? 'saveDate';

    await this.mailService.sendTemplate({
      to: body.email,
      type: templateType,
      payload: body.payload ?? {},
    });

    return { success: true };
  }
}

