import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateReviewDto, UpdateReviewDto } from './dto/reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Get()
  getReviews(@Req() req: Request, @Res() res: Response) {
    return this.reviewsService.getReviews(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/review/:id')
  getReviewById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.reviewsService.getReviewById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/review')
  createReview(@Req() req: Request, @Body() dto: CreateReviewDto, @Res() res: Response) {
    return this.reviewsService.createReview(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/review/:id')
  updateReview(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateReviewDto, @Res() res: Response) {
    return this.reviewsService.updateReview(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/review/:id')
  deleteReview(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.reviewsService.deleteReview(params.id, req, res)
  }
}
