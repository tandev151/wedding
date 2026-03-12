import { buildMailTemplate } from './mail-templates';

describe('buildMailTemplate', () => {
  it('builds saveDate template with couple name', () => {
    const result = buildMailTemplate('saveDate', {
      coupleName: 'Tấn Bảo & Anh Thư',
      weddingDate: '24/10/2026 18:30',
      rsvpSummaryUrl: 'https://example.com/rsvp',
    });

    expect(result.subject).toContain('Save the date');
    expect(result.subject).toContain('Tấn Bảo & Anh Thư');
    expect(result.html).toContain('Xác nhận tham dự');
  });

  it('builds rsvpConfirmation template', () => {
    const result = buildMailTemplate('rsvpConfirmation', {
      coupleName: 'Tấn Bảo & Anh Thư',
    });

    expect(result.subject).toContain('RSVP');
  });
});

