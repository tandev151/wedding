import { Injectable, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';

@Injectable()
export class WeddingsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWeddingDto) {
    return this.prisma.wedding.create({ data: { ...dto, eventDate: new Date(dto.eventDate) } });
  }

  async findAll() {
    return this.prisma.wedding.findMany({ include: { owner: { select: { id: true, email: true } } } });
  }

  async findOne(id: number) {
    const w = await this.prisma.wedding.findUnique({
      where: { id },
      include: { owner: { select: { id: true, email: true } } },
    });
    if (!w) throw new NotFoundException(`Wedding #${id} not found`);
    return w;
  }

  async findBySlug(slug: string) {
    const w = await this.prisma.wedding.findUnique({ where: { slug } });
    if (!w) throw new NotFoundException(`Wedding "${slug}" not found`);
    return w;
  }

  async findByOwner(ownerId: number) {
    const w = await this.prisma.wedding.findUnique({ where: { ownerId } });
    if (!w) throw new NotFoundException('You do not have a wedding yet');
    return w;
  }

  async update(id: number, dto: UpdateWeddingDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.eventDate) data.eventDate = new Date(dto.eventDate);
    return this.prisma.wedding.update({ where: { id }, data });
  }

  async updateByOwner(ownerId: number, dto: UpdateWeddingDto) {
    const w = await this.findByOwner(ownerId);
    return this.update(w.id, dto);
  }

  async getRsvps(weddingId: number) {
    return this.prisma.rsvp.findMany({
      where: { weddingId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyRsvps(ownerId: number) {
    const w = await this.findByOwner(ownerId);
    return this.getRsvps(w.id);
  }

  async setPublished(id: number, isPublished: boolean) {
    await this.findOne(id);
    return this.prisma.wedding.update({ where: { id }, data: { isPublished } });
  }

  private buildCsv(rsvps: any[]): string {
    const header = ['requestId', 'fullName', 'phone', 'attending', 'guestCount', 'message', 'createdAt'];
    const rows = rsvps.map((r) => [
      r.requestId,
      `"${r.fullName}"`,
      r.phone,
      r.attending,
      r.guestCount,
      `"${r.message ?? ''}"`,
      r.createdAt.toISOString(),
    ]);
    return [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  async exportRsvpsCsv(weddingId: number, res: Response) {
    const rsvps = await this.getRsvps(weddingId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="rsvps-${weddingId}.csv"`);
    res.send(this.buildCsv(rsvps));
  }

  async exportMyRsvpsCsv(ownerId: number, res: Response) {
    const w = await this.findByOwner(ownerId);
    return this.exportRsvpsCsv(w.id, res);
  }
}
