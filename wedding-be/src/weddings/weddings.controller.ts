import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards, Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { WeddingsService } from './weddings.service';
import { CreateWeddingDto } from './dto/create-wedding.dto';
import { UpdateWeddingDto } from './dto/update-wedding.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('weddings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WeddingsController {
  constructor(private weddingsService: WeddingsService) {}

  // CLIENT routes
  @Get('me')
  @Roles(Role.CLIENT)
  getMyWedding(@CurrentUser() user: any) {
    return this.weddingsService.findByOwner(user.id);
  }

  @Patch('me')
  @Roles(Role.CLIENT)
  updateMyWedding(@CurrentUser() user: any, @Body() dto: UpdateWeddingDto) {
    return this.weddingsService.updateByOwner(user.id, dto);
  }

  @Get('me/rsvps')
  @Roles(Role.CLIENT)
  getMyRsvps(@CurrentUser() user: any) {
    return this.weddingsService.getMyRsvps(user.id);
  }

  @Get('me/rsvps/export')
  @Roles(Role.CLIENT)
  exportMyRsvps(@CurrentUser() user: any, @Res() res: Response) {
    return this.weddingsService.exportMyRsvpsCsv(user.id, res);
  }

  // ADMIN routes
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateWeddingDto) {
    return this.weddingsService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.weddingsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWeddingDto) {
    return this.weddingsService.update(id, dto);
  }

  @Get(':id/rsvps')
  @Roles(Role.ADMIN)
  getRsvps(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.getRsvps(id);
  }

  @Get(':id/rsvps/export')
  @Roles(Role.ADMIN)
  exportRsvps(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    return this.weddingsService.exportRsvpsCsv(id, res);
  }

  @Patch(':id/publish')
  @Roles(Role.ADMIN)
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.setPublished(id, true);
  }

  @Delete(':id/publish')
  @Roles(Role.ADMIN)
  unpublish(@Param('id', ParseIntPipe) id: number) {
    return this.weddingsService.setPublished(id, false);
  }
}
