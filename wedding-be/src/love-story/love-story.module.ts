import { Module } from '@nestjs/common';
import { LoveStoryService } from './love-story.service';
import { LoveStoryController } from './love-story.controller';
import { WeddingsModule } from '../weddings/weddings.module';

@Module({
  imports: [WeddingsModule],
  controllers: [LoveStoryController],
  providers: [LoveStoryService],
})
export class LoveStoryModule {}
