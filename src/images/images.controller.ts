import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { CreateImageDto, UpdateImageDto } from './dto/images.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Get()
  getImages(@Req() req: Request, @Res() res: Response) {
    return this.imagesService.getImages(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/image/:id')
  getImageById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.imagesService.getImageById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/image')
  createImage(@Req() req: Request, @Body() dto: CreateImageDto, @Res() res: Response) {
    return this.imagesService.createImage(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/image/:id')
  updateImage(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateImageDto, @Res() res: Response) {
    return this.imagesService.updateImage(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/image/:id')
  deleteImage(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.imagesService.deleteImage(params.id, req, res)
  }
}
