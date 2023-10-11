import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SpecialsService } from './specials.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateSpecialDto, UpdateSpecialDto } from './dto/specials.dto';

@Controller('specials')
export class SpecialsController {
  constructor(private readonly specialsService: SpecialsService) { }

  @Get()
  getSpecials(@Req() req: Request, @Res() res: Response) {
    return this.specialsService.getSpecials(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/special/:id')
  getSpecialById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.specialsService.getSpecialById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/special')
  createSpecial(@Req() req: Request, @Body() dto: CreateSpecialDto, @Res() res: Response) {
    return this.specialsService.createSpecial(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/special/:id')
  updateSpecial(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateSpecialDto, @Res() res: Response) {
    return this.specialsService.updateSpecial(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/special/:id')
  deleteSpecial(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.specialsService.deleteSpecial(params.id, req, res)
  }
}
