import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { InclusionsService } from './inclusions.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateInclusionDto, UpdateInclusionDto } from './dto/inclusions.dto';

@Controller('inclusions')
export class InclusionsController {
  constructor(private readonly inclusionsService: InclusionsService) { }

  @Get()
  getInclusions(@Req() req: Request, @Res() res: Response) {
    return this.inclusionsService.getInclusions(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/inclusion/:id')
  getInclusionById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.inclusionsService.getInclusionById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/inclusion')
  createInclusion(@Req() req: Request, @Body() dto: CreateInclusionDto, @Res() res: Response) {
    return this.inclusionsService.createInclusion(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/inclusion/:id')
  updateInclusion(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateInclusionDto, @Res() res: Response) {
    return this.inclusionsService.updateInclusion(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/inclusion/:id')
  deleteInclusion(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.inclusionsService.deleteInclusion(params.id, req, res)
  }
}
