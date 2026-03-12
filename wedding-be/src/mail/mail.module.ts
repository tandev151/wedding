import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MAIL_FROM, MAIL_TRANSPORTER } from './mail.constants';

@Module({
  imports: [ConfigModule],
  controllers: [MailController],
  providers: [
    {
      provide: MAIL_TRANSPORTER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('MAIL_HOST');
        const port = Number(configService.get('MAIL_PORT') ?? 587);
        const user = configService.get<string>('MAIL_USER');
        const pass = configService.get<string>('MAIL_PASS');

        return nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: user && pass ? { user, pass } : undefined,
        });
      },
    },
    {
      provide: MAIL_FROM,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<string>('MAIL_FROM') ?? '',
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
