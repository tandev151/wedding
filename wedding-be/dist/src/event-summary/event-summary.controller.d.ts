import { PrismaService } from '../prisma/prisma.service';
export declare class EventSummaryController {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(slug: string): Promise<{
        coupleName: string;
        monogram: string | null;
        heroMessage: string | null;
        eventDate: Date;
        ceremonyVenueName: string | null;
        ceremonyVenueAddress: string | null;
        ceremonyTime: string | null;
        venueName: string;
        venueAddress: string;
        receptionTime: string | null;
        dressCode: string;
        mapUrl: string;
        groomName: string | null;
        groomFullName: string | null;
        groomDescription: string | null;
        groomImageUrl: string | null;
        groomParents: string | null;
        groomBank: string | null;
        groomBankAccount: string | null;
        groomBankName: string | null;
        brideName: string | null;
        brideFullName: string | null;
        brideDescription: string | null;
        brideImageUrl: string | null;
        brideParents: string | null;
        brideBank: string | null;
        brideBankAccount: string | null;
        brideBankName: string | null;
        videoId: string | null;
        gallery: {
            id: number;
            weddingId: number;
            imageUrl: string;
            alt: string | null;
            order: number;
        }[];
        loveStory: {
            id: number;
            weddingId: number;
            order: number;
            dateLabel: string;
            title: string;
            description: string;
        }[];
    }>;
}
