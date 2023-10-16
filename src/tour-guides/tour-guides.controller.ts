import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { TourGuidesService } from './tour-guides.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { CreateTourGuideDto, UpdateTourGuideDto } from './dto/tour-guides.dto';

@Controller('tour-guides')
export class TourGuidesController {
  constructor(private readonly tourGuidesService: TourGuidesService) { }

  @Get()
  getTourGuides(@Req() req: Request, @Res() res: Response) {
    return this.tourGuidesService.getTourGuides(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tour-guide/:id')
  getTourInfoById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tourGuidesService.getTourGuideById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/tour-guide')
  createTourGuide(@Req() req: Request, @Body() dto: CreateTourGuideDto, @Res() res: Response) {
    return this.tourGuidesService.createTourGuide(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/tour-guide/:id')
  updateTourGuide(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateTourGuideDto, @Res() res: Response) {
    return this.tourGuidesService.updateTourGuide(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/tour-guide/:id')
  deleteTourGuide(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tourGuidesService.deleteTourGuide(params.id, req, res)
  }








  // @UseGuards(JwtAuthGuard)
  // @Get('/user/:id')
  // getUserById(@Param() params: { id: string }, @Req() req: Request) {
  //   return this.tourGuidesService.getUserById(params.id, req)
  // }

  // @Get()
}
