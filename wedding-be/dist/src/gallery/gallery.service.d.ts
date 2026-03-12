import { PrismaService } from '../prisma/prisma.service';
import { WeddingsService } from '../weddings/weddings.service';
import { CreateGalleryPhotoDto } from './dto/create-gallery-photo.dto';
import { UpdateGalleryPhotoDto } from './dto/update-gallery-photo.dto';
export declare class GalleryService {
    private prisma;
    private weddingsService;
    constructor(prisma: PrismaService, weddingsService: WeddingsService);
    private getWeddingId;
    private assertOwnership;
    findAll(ownerId: number): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }[]>;
    create(ownerId: number, dto: CreateGalleryPhotoDto): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
    update(ownerId: number, photoId: number, dto: UpdateGalleryPhotoDto): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
    remove(ownerId: number, photoId: number): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
}
