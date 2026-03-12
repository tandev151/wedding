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

export function buildMailTemplate(type: MailTemplateType, payload: MailTemplatePayload = {}): BuiltMailTemplate {
  const couple = payload.coupleName ?? 'Cặp đôi';
  const dateLabel = payload.weddingDate ?? 'ngày trọng đại sắp tới';
  const rsvpUrl = payload.rsvpSummaryUrl ?? '#';

  if (type === 'saveDate') {
    const subject = `Save the date – ${couple}`;
    const text = [
      `Trân trọng kính mời bạn cùng chung vui với ${couple} vào ${dateLabel}.`,
      `Vui lòng xác nhận tham dự tại: ${rsvpUrl}`,
    ].join('\n');

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#111; line-height:1.6;">
        <p style="font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin:0 0 8px;">Save the date</p>
        <h1 style="font-size:24px; margin:0 0 12px; font-weight:600;">${couple}</h1>
        <p style="margin:0 0 8px;">Trân trọng kính mời bạn đến chung vui vào ${dateLabel}.</p>
        <p style="margin:0 0 16px;">Rất mong nhận được sự hiện diện của bạn.</p>
        <a href="${rsvpUrl}" style="display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid #111; text-decoration:none; color:#fff; background:#111; font-weight:600;">
          Xác nhận tham dự
        </a>
      </div>
    `;

    return { subject, html, text };
  }

  if (type === 'rsvpConfirmation') {
    const subject = `RSVP đã được ghi nhận – ${couple}`;
    const text = [
      `Cảm ơn bạn đã xác nhận tham dự cùng ${couple}.`,
      `Nếu cần chỉnh sửa thông tin, vui lòng liên hệ trực tiếp cô dâu/chú rể.`,
    ].join('\n');

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#111; line-height:1.6;">
        <h1 style="font-size:20px; margin:0 0 12px; font-weight:600;">RSVP đã được ghi nhận</h1>
        <p style="margin:0 0 8px;">Cảm ơn bạn đã xác nhận tham dự cùng ${couple}.</p>
        <p style="margin:0;">Rất mong được gặp bạn trong ${dateLabel}.</p>
      </div>
    `;

    return { subject, html, text };
  }

  const subject = payload.message ? `Thông báo từ wedding` : 'Wedding notification';
  const text = payload.message ?? 'Đây là email thông báo từ hệ thống wedding.';
  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color:#111; line-height:1.6;">
      <p>${payload.message ?? 'Đây là email thông báo từ hệ thống wedding.'}</p>
    </div>
  `;

  return { subject, html, text };
}

