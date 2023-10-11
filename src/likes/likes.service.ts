import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateLikeDto, UpdateLikeDto } from './dto/likes.dto';


@Injectable()
export class LikesService {

  constructor(private prisma: PrismaService) { }


  async getLikes(req: Request, res: Response) {
    const likes = await this.prisma.like.findMany()
    return res.send(JSON.stringify(likes))
  }

  async getLikeById(id: string, req: Request, res: Response) {
    const foundLike = await this.prisma.like.findUnique({
      where: {
        id,
      }
    })

    if (!foundLike) {
      throw new BadRequestException('No like found for id' + id)
    }

    const Like = await this.prisma.like.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Like))
  }

  async createLike(dto: CreateLikeDto, req: Request, res: Response) {
    const like = await this.prisma.like.create({
      data: dto
    })

    return res.send(JSON.stringify(like))

  }

  async updateLike(id: string, dto: UpdateLikeDto, req: Request, res: Response) {

    const foundLike = await this.prisma.like.findUnique({
      where: {
        id,
      }
    })

    if (!foundLike) {
      throw new BadRequestException('No like found for id' + id)
    }

    const updatedLike = await this.prisma.like.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedLike))
  }

  async deleteLike(id: string, req: Request, res: Response) {

    const foundLike = await this.prisma.like.findUnique({
      where: {
        id,
      }
    })

    if (!foundLike) {
      throw new BadRequestException('No like found for id' + id)
    }

    const deletedLike = await this.prisma.like.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedLike))

  }


}
