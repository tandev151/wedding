import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client: PrismaClient;

  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    this.client = new PrismaClient({ adapter });
  }

  get user() { return this.client.user; }
  get wedding() { return this.client.wedding; }
  get rsvp() { return this.client.rsvp; }
  get galleryPhoto() { return this.client.galleryPhoto; }
  get loveStoryEvent() { return this.client.loveStoryEvent; }

  $transaction: PrismaClient['$transaction'] = (...args: any[]) =>
    (this.client.$transaction as any)(...args);

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
