import { PartialType } from '@nestjs/mapped-types';
import { CreateLoveStoryEventDto } from './create-love-story-event.dto';

export class UpdateLoveStoryEventDto extends PartialType(CreateLoveStoryEventDto) {}
