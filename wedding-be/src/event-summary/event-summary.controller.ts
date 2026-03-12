import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('v1/event-summary')
export class EventSummaryController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getSummary(@Query('slug') slug: string) {
    if (!slug) throw new NotFoundException('slug is required');
    const wedding = await this.prisma.wedding.findUnique({
      where: { slug },
      include: {
        gallery: { orderBy: { order: 'asc' } },
        loveStory: { orderBy: { order: 'asc' } },
      },
    });
    if (!wedding) throw new NotFoundException(`Wedding "${slug}" not found`);

    return {
      coupleName: wedding.coupleName,
      monogram: wedding.monogram,
      heroMessage: wedding.heroMessage,
      eventDate: wedding.eventDate,

      ceremonyVenueName: wedding.ceremonyVenueName,
      ceremonyVenueAddress: wedding.ceremonyVenueAddress,
      ceremonyTime: wedding.ceremonyTime,

      venueName: wedding.venueName,
      venueAddress: wedding.venueAddress,
      receptionTime: wedding.receptionTime,
      dressCode: wedding.dressCode,
      mapUrl: wedding.mapUrl,

      groomName: wedding.groomName,
      groomFullName: wedding.groomFullName,
      groomDescription: wedding.groomDescription,
      groomImageUrl: wedding.groomImageUrl,
      groomParents: wedding.groomParents,
      groomBank: wedding.groomBank,
      groomBankAccount: wedding.groomBankAccount,
      groomBankName: wedding.groomBankName,

      brideName: wedding.brideName,
      brideFullName: wedding.brideFullName,
      brideDescription: wedding.brideDescription,
      brideImageUrl: wedding.brideImageUrl,
      brideParents: wedding.brideParents,
      brideBank: wedding.brideBank,
      brideBankAccount: wedding.brideBankAccount,
      brideBankName: wedding.brideBankName,

      videoId: wedding.videoId,
      gallery: wedding.gallery,
      loveStory: wedding.loveStory,
    };
  }
}
