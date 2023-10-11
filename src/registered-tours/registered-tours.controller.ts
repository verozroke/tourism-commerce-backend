import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisteredToursService } from './registered-tours.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateRegisteredTourDto, UpdateRegisteredTourDto } from './dto/registered-tours.dto';

@Controller('registered-tours')
export class RegisteredToursController {
  constructor(private readonly registeredToursService: RegisteredToursService) { }

  @Get()
  getRegisteredTours(@Req() req: Request, @Res() res: Response) {
    return this.registeredToursService.getRegisteredTours(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/registered-tour/:id')
  getRegisteredTourById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.registeredToursService.getRegisteredTourById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/registered-tour')
  createRegisteredTour(@Req() req: Request, @Body() dto: CreateRegisteredTourDto, @Res() res: Response) {
    return this.registeredToursService.createRegisteredTour(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/registered-tour/:id')
  updateRegisteredTour(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateRegisteredTourDto, @Res() res: Response) {
    return this.registeredToursService.updateRegisteredTour(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/registered-tour/:id')
  deleteRegisteredTour(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.registeredToursService.deleteRegisteredTour(params.id, req, res)
  }
}
