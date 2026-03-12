import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Injectable()
export class RsvpService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async submit(dto: CreateRsvpDto) {
    const wedding = await this.prisma.wedding.findUnique({ where: { slug: dto.weddingSlug } });
    if (!wedding) throw new NotFoundException(`Wedding "${dto.weddingSlug}" not found`);

    const { weddingSlug, email, ...rest } = dto;
    const rsvp = await this.prisma.rsvp.create({
      data: { ...rest, weddingId: wedding.id },
    });

    if (email) {
      this.mailService
        .sendTemplate({
          to: email,
          type: 'rsvpConfirmation',
          payload: { coupleName: wedding.coupleName ?? undefined },
        })
        .catch(() => {
          // fire-and-forget: lỗi mail không ảnh hưởng response
        });
    }

    return rsvp;
  }
}
