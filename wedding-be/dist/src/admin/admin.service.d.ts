import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        totalUsers: number;
        totalWeddings: number;
        publishedWeddings: number;
        unpublishedWeddings: number;
        totalRsvps: number;
        rsvpsByStatus: {
            status: import("@prisma/client").$Enums.AttendanceStatus;
            count: number;
        }[];
    }>;
}
