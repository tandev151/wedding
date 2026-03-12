import { LoveStoryService } from './love-story.service';
import { CreateLoveStoryEventDto } from './dto/create-love-story-event.dto';
import { UpdateLoveStoryEventDto } from './dto/update-love-story-event.dto';
export declare class LoveStoryController {
    private loveStoryService;
    constructor(loveStoryService: LoveStoryService);
    findAll(user: any): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }[]>;
    create(user: any, dto: CreateLoveStoryEventDto): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
    update(user: any, id: number, dto: UpdateLoveStoryEventDto): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
    remove(user: any, id: number): Promise<{
        id: number;
        weddingId: number;
        order: number;
        dateLabel: string;
        title: string;
        description: string;
    }>;
}
