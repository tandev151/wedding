import { GalleryService } from './gallery.service';
import { CreateGalleryPhotoDto } from './dto/create-gallery-photo.dto';
import { UpdateGalleryPhotoDto } from './dto/update-gallery-photo.dto';
export declare class GalleryController {
    private galleryService;
    constructor(galleryService: GalleryService);
    findAll(user: any): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }[]>;
    create(user: any, dto: CreateGalleryPhotoDto): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
    update(user: any, id: number, dto: UpdateGalleryPhotoDto): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
    remove(user: any, id: number): Promise<{
        id: number;
        weddingId: number;
        imageUrl: string;
        alt: string | null;
        order: number;
    }>;
}
