import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ItinerariesService } from './itineraries.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateItineraryDto, UpdateItineraryDto } from './dto/itineraries.dto';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) { }

  @Get()
  getItineraries(@Req() req: Request, @Res() res: Response) {
    return this.itinerariesService.getItineraries(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/itinerary/:id')
  getItineraryById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.itinerariesService.getItineraryById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/itinerary')
  createItinerary(@Req() req: Request, @Body() dto: CreateItineraryDto, @Res() res: Response) {
    return this.itinerariesService.createItinerary(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/itinerary/:id')
  updateItinerary(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateItineraryDto, @Res() res: Response) {
    return this.itinerariesService.updateItinerary(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/itinerary/:id')
  deleteItinerary(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.itinerariesService.deleteItinerary(params.id, req, res)
  }
}
