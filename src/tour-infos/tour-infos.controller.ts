import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { TourInfosService } from './tour-infos.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTourInfoDto, UpdateTourInfoDto } from './dto/tour-info.dto';

@Controller('tour-infos')
export class TourInfosController {
  constructor(private readonly tourInfosService: TourInfosService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTourInfos(@Query() query, @Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.getTourInfos(query, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/length')
  getTourLength(@Query() query, @Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.getTourLength(query, req, res)
  }

  @Get('/featured')
  getFeaturedTourInfos(@Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.getFeaturedTourInfos(req, res)
  }

  @Get('/top-destinations')
  getTopDestinations(@Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.getTopDestinations(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tour-info/:id')
  getTourInfoById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.getTourInfoById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/tour-info')
  createTourInfo(@Req() req: Request, @Body() dto: CreateTourInfoDto, @Res() res: Response) {
    return this.tourInfosService.createTourInfo(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/tour-info/:id')
  updateTourInfo(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateTourInfoDto, @Res() res: Response) {
    return this.tourInfosService.updateTourInfo(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/tour-info/:id')
  deleteTourInfo(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.deleteTourInfo(params.id, req, res)
  }

  @Get('/search/:q')
  searchTourInfo(@Param() params: { q: string }, @Req() req: Request, @Res() res: Response) {
    return this.tourInfosService.searchTourInfos(params.q, req, res)
  }








  // @UseGuards(JwtAuthGuard)
  // @Get('/user/:id')
  // getUserById(@Param() params: { id: string }, @Req() req: Request) {
  //   return this.tourInfosService.getUserById(params.id, req)
  // }

  // @Get()
}
