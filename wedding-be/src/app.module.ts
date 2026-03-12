import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WeddingsModule } from './weddings/weddings.module';
import { RsvpModule } from './rsvp/rsvp.module';
import { EventSummaryModule } from './event-summary/event-summary.module';
import { GalleryModule } from './gallery/gallery.module';
import { LoveStoryModule } from './love-story/love-story.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WeddingsModule,
    RsvpModule,
    EventSummaryModule,
    GalleryModule,
    LoveStoryModule,
    AdminModule,
    UploadModule,
    MailModule,
  ],
})
export class AppModule {}
