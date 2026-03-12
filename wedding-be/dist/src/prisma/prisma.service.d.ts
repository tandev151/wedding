import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService implements OnModuleInit, OnModuleDestroy {
    private readonly client;
    constructor();
    get user(): import("@prisma/client").Prisma.UserDelegate<import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get wedding(): import("@prisma/client").Prisma.WeddingDelegate<import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get rsvp(): import("@prisma/client").Prisma.RsvpDelegate<import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get galleryPhoto(): import("@prisma/client").Prisma.GalleryPhotoDelegate<import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    get loveStoryEvent(): import("@prisma/client").Prisma.LoveStoryEventDelegate<import(".prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    $transaction: PrismaClient['$transaction'];
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
