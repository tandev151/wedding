import { Controller, Post, Body } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

@Controller('v1/rsvp')
export class RsvpController {
  constructor(private rsvpService: RsvpService) {}

  @Post()
  submit(@Body() dto: CreateRsvpDto) {
    return this.rsvpService.submit(dto);
  }
}
