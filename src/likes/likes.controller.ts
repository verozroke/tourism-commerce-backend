import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateLikeDto, UpdateLikeDto } from './dto/likes.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Get()
  getLikes(@Req() req: Request, @Res() res: Response) {
    return this.likesService.getLikes(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/like/:id')
  getLikeById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.likesService.getLikeById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/like')
  createLike(@Req() req: Request, @Body() dto: CreateLikeDto, @Res() res: Response) {
    return this.likesService.createLike(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/like/:id')
  updateLike(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateLikeDto, @Res() res: Response) {
    return this.likesService.updateLike(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/like/:id')
  deleteLike(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.likesService.deleteLike(params.id, req, res)
  }
}
