import { PrismaService } from '../prisma/prisma.service';
import { WeddingsService } from '../weddings/weddings.service';
import { CreateLoveStoryEventDto } from './dto/create-love-story-event.dto';
import { UpdateLoveStoryEventDto } from './dto/update-love-story-event.dto';
export declare class LoveStoryService {
    private prisma;
    private weddingsService;
    constructor(prisma: PrismaService, weddingsService: WeddingsService);
    private getWeddingId;
    private assertOwnership;
    findAll(ownerId: number): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }[]>;
    create(ownerId: number, dto: CreateLoveStoryEventDto): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
    update(ownerId: number, eventId: number, dto: UpdateLoveStoryEventDto): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
    remove(ownerId: number, eventId: number): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
}
