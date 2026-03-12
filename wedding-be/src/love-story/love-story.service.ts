import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeddingsService } from '../weddings/weddings.service';
import { CreateLoveStoryEventDto } from './dto/create-love-story-event.dto';
import { UpdateLoveStoryEventDto } from './dto/update-love-story-event.dto';

@Injectable()
export class LoveStoryService {
  constructor(
    private prisma: PrismaService,
    private weddingsService: WeddingsService,
  ) {}

  private async getWeddingId(ownerId: number): Promise<number> {
    const wedding = await this.weddingsService.findByOwner(ownerId);
    return wedding.id;
  }

  private async assertOwnership(ownerId: number, eventId: number) {
    const weddingId = await this.getWeddingId(ownerId);
    const event = await this.prisma.loveStoryEvent.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException(`Love story event #${eventId} not found`);
    if (event.weddingId !== weddingId) throw new ForbiddenException();
    return event;
  }

  async findAll(ownerId: number) {
    const weddingId = await this.getWeddingId(ownerId);
    return this.prisma.loveStoryEvent.findMany({
      where: { weddingId },
      orderBy: { order: 'asc' },
    });
  }

  async create(ownerId: number, dto: CreateLoveStoryEventDto) {
    const weddingId = await this.getWeddingId(ownerId);
    return this.prisma.loveStoryEvent.create({ data: { ...dto, weddingId } });
  }

  async update(ownerId: number, eventId: number, dto: UpdateLoveStoryEventDto) {
    await this.assertOwnership(ownerId, eventId);
    return this.prisma.loveStoryEvent.update({ where: { id: eventId }, data: dto });
  }

  async remove(ownerId: number, eventId: number) {
    await this.assertOwnership(ownerId, eventId);
    return this.prisma.loveStoryEvent.delete({ where: { id: eventId } });
  }
}
