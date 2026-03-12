import type { Transporter } from 'nodemailer';
import type { MailTemplatePayload, MailTemplateType } from './templates/mail-templates';
export interface SendTemplateOptions {
    to: string;
    type: MailTemplateType;
    payload?: MailTemplatePayload;
}
export declare class MailService {
    private readonly transporter;
    private readonly mailFrom;
    private readonly logger;
    constructor(transporter: Transporter, mailFrom: string);
    sendRaw(options: {
        to: string;
        subject: string;
        html: string;
        text: string;
    }): Promise<void>;
    sendTemplate(options: SendTemplateOptions): Promise<void>;
}
