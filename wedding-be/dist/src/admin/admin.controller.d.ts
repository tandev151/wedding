import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
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
