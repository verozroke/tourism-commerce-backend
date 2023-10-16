import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateReviewDto, UpdateReviewDto } from './dto/reviews.dto';


@Injectable()
export class ReviewsService {

  constructor(private prisma: PrismaService) { }


  async getReviews(req: Request, res: Response) {
    const reviews = await this.prisma.review.findMany()
    return res.send(JSON.stringify(reviews))
  }

  async getReviewById(id: string, req: Request, res: Response) {
    const foundReview = await this.prisma.review.findUnique({
      where: {
        id,
      }
    })

    if (!foundReview) {
      throw new BadRequestException('No review found for id' + id)
    }

    const Review = await this.prisma.review.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Review))
  }

  async createReview(dto: CreateReviewDto, req: Request, res: Response) {
    const review = await this.prisma.review.create({
      data: dto
    })

    return res.send(JSON.stringify(review))

  }

  async updateReview(id: string, dto: UpdateReviewDto, req: Request, res: Response) {

    const foundReview = await this.prisma.review.findUnique({
      where: {
        id,
      }
    })

    if (!foundReview) {
      throw new BadRequestException('No review found for id' + id)
    }

    const updatedReview = await this.prisma.review.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedReview))
  }

  async deleteReview(id: string, req: Request, res: Response) {

    const foundReview = await this.prisma.review.findUnique({
      where: {
        id,
      }
    })

    if (!foundReview) {
      throw new BadRequestException('No review found for id' + id)
    }

    const deletedReview = await this.prisma.review.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedReview))

  }


}
