export type MailTemplateType = 'saveDate' | 'rsvpConfirmation' | 'generic';
export interface MailTemplatePayload {
    coupleName?: string;
    weddingDate?: string;
    rsvpSummaryUrl?: string;
    message?: string;
}
export interface BuiltMailTemplate {
    subject: string;
    html: string;
    text: string;
}
export declare function buildMailTemplate(type: MailTemplateType, payload?: MailTemplatePayload): BuiltMailTemplate;
