import { AttendanceStatus } from '@prisma/client';
export declare class CreateRsvpDto {
    weddingSlug: string;
    fullName: string;
    phone: string;
    email?: string;
    attending: AttendanceStatus;
    guestCount: number;
    message?: string;
}
