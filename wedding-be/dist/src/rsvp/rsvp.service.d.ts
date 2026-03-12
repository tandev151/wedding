import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
export declare class RsvpService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
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
