import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
export declare class RsvpController {
    private rsvpService;
    constructor(rsvpService: RsvpService);
    submit(dto: CreateRsvpDto): Promise<{
        id: number;
        createdAt: Date;
        requestId: string;
        fullName: string;
        phone: string;
        attending: import("@prisma/client").$Enums.AttendanceStatus;
        guestCount: number;
        message: string | null;
        weddingId: number;
    }>;
}
