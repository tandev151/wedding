import { Module } from '@nestjs/common';
import { EventSummaryController } from './event-summary.controller';

@Module({
  controllers: [EventSummaryController],
})
export class EventSummaryModule {}
