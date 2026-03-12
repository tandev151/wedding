import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeddingsService } from '../weddings/weddings.service';
import { CreateGalleryPhotoDto } from './dto/create-gallery-photo.dto';
import { UpdateGalleryPhotoDto } from './dto/update-gallery-photo.dto';

@Injectable()
export class GalleryService {
  constructor(
    private prisma: PrismaService,
    private weddingsService: WeddingsService,
  ) {}

  private async getWeddingId(ownerId: number): Promise<number> {
    const wedding = await this.weddingsService.findByOwner(ownerId);
    return wedding.id;
  }

  private async assertOwnership(ownerId: number, photoId: number) {
    const weddingId = await this.getWeddingId(ownerId);
    const photo = await this.prisma.galleryPhoto.findUnique({ where: { id: photoId } });
    if (!photo) throw new NotFoundException(`Photo #${photoId} not found`);
    if (photo.weddingId !== weddingId) throw new ForbiddenException();
    return photo;
  }

  async findAll(ownerId: number) {
    const weddingId = await this.getWeddingId(ownerId);
    return this.prisma.galleryPhoto.findMany({
      where: { weddingId },
      orderBy: { order: 'asc' },
    });
  }

  async create(ownerId: number, dto: CreateGalleryPhotoDto) {
    const weddingId = await this.getWeddingId(ownerId);
    return this.prisma.galleryPhoto.create({ data: { ...dto, weddingId } });
  }

  async update(ownerId: number, photoId: number, dto: UpdateGalleryPhotoDto) {
    await this.assertOwnership(ownerId, photoId);
    return this.prisma.galleryPhoto.update({ where: { id: photoId }, data: dto });
  }

  async remove(ownerId: number, photoId: number) {
    await this.assertOwnership(ownerId, photoId);
    return this.prisma.galleryPhoto.delete({ where: { id: photoId } });
  }
}
