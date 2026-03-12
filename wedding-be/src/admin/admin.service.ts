import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [totalUsers, totalWeddings, publishedWeddings, rsvpsByStatus] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.wedding.count(),
      this.prisma.wedding.count({ where: { isPublished: true } }),
      this.prisma.rsvp.groupBy({ by: ['attending'], _count: { _all: true } }),
    ]);

    const totalRsvps = rsvpsByStatus.reduce((acc, r) => acc + r._count._all, 0);

    return {
      totalUsers,
      totalWeddings,
      publishedWeddings,
      unpublishedWeddings: totalWeddings - publishedWeddings,
      totalRsvps,
      rsvpsByStatus: rsvpsByStatus.map((r) => ({
        status: r.attending,
        count: r._count._all,
      })),
    };
  }
}
