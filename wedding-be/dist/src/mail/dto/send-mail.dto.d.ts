import type { MailTemplateType } from '../templates/mail-templates';
export declare class SendMailDto {
    email: string;
    templateType?: MailTemplateType;
    payload?: Record<string, unknown>;
}
