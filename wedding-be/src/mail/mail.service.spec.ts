import { Test, TestingModule } from '@nestjs/testing';

import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;
  const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-id' });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: 'MAIL_TRANSPORTER',
          useValue: { sendMail: sendMailMock },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
    sendMailMock.mockClear();
  });

  it('sends template email without throwing', async () => {
    await expect(
      service.sendTemplate({
        to: 'test@example.com',
        type: 'generic',
        payload: { message: 'Xin chào' },
      }),
    ).resolves.not.toThrow();

    expect(sendMailMock).toHaveBeenCalled();
  });
});

