import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { LoveStoryService } from './love-story.service';
import { CreateLoveStoryEventDto } from './dto/create-love-story-event.dto';
import { UpdateLoveStoryEventDto } from './dto/update-love-story-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('weddings/me/love-story')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class LoveStoryController {
  constructor(private loveStoryService: LoveStoryService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.loveStoryService.findAll(user.id);
  }

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateLoveStoryEventDto) {
    return this.loveStoryService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLoveStoryEventDto,
  ) {
    return this.loveStoryService.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: any, @Param('id', ParseIntPipe) id: number) {
    return this.loveStoryService.remove(user.id, id);
  }
}
