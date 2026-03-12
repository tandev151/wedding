import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import type { Transporter } from 'nodemailer';

import { MAIL_FROM, MAIL_TRANSPORTER } from './mail.constants';
import type { BuiltMailTemplate, MailTemplatePayload, MailTemplateType } from './templates/mail-templates';
import { buildMailTemplate } from './templates/mail-templates';

export interface SendTemplateOptions {
  to: string;
  type: MailTemplateType;
  payload?: MailTemplatePayload;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(MAIL_TRANSPORTER) private readonly transporter: Transporter,
    @Inject(MAIL_FROM) private readonly mailFrom: string,
  ) {}

  async sendRaw(options: { to: string; subject: string; html: string; text: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: this.mailFrom,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      this.logger.debug?.(`Sent mail to ${options.to} with id ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send mail to ${options.to}`, error instanceof Error ? error.stack : undefined);
      throw new InternalServerErrorException('Không gửi được email, vui lòng thử lại sau.');
    }
  }

  async sendTemplate(options: SendTemplateOptions) {
    const template: BuiltMailTemplate = buildMailTemplate(options.type, options.payload);
    await this.sendRaw({
      to: options.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }
}

