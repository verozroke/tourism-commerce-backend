import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { DurationsService } from './durations.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { CreateDurationDto, UpdateDurationDto } from './dto/durations.dto';

@Controller('durations')
export class DurationsController {
  constructor(private readonly durationsService: DurationsService) { }

  @Get()
  getDurations(@Req() req: Request, @Res() res: Response) {
    return this.durationsService.getDurations(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/duration/:id')
  getDurationById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.durationsService.getDurationById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/duration')
  createDuration(@Req() req: Request, @Body() dto: CreateDurationDto, @Res() res: Response) {
    return this.durationsService.createDuration(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/duration/:id')
  updateDuration(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateDurationDto, @Res() res: Response) {
    return this.durationsService.updateDuration(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/duration/:id')
  deleteDuration(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.durationsService.deleteDuration(params.id, req, res)
  }
}
