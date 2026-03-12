import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { WeddingsModule } from '../weddings/weddings.module';

@Module({
  imports: [WeddingsModule],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
