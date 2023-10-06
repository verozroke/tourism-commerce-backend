import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateTourInfoDto, UpdateTourInfoDto } from './dto/tour-info.dto';


@Injectable()
export class TourInfosService {

  constructor(private prisma: PrismaService) { }


  async getTourInfos(req: Request, res: Response) {
    const tourInfos = await this.prisma.tourInfo.findMany()
    return res.send(JSON.stringify(tourInfos))
  }

  async getTourInfoById(id: string, req: Request, res: Response) {
    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const tourInfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(tourInfo))
  }

  async createTourInfo(dto: CreateTourInfoDto, req: Request, res: Response) {
    const { title } = dto

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        title,
      }
    })

    if (foundTourUnfo) {
      throw new BadRequestException('Existing tour')
    }

    const tourInfo = await this.prisma.tourInfo.create({
      data: dto
    })

    return res.send(JSON.stringify(tourInfo))

  }

  async updateTourInfo(id: string, dto: UpdateTourInfoDto, req: Request, res: Response) {

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const updatedTourInfo = await this.prisma.tourInfo.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedTourInfo))
  }

  async deleteTourInfo(id: string, req: Request, res: Response) {

    const foundTourUnfo = await this.prisma.tourInfo.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourUnfo) {
      throw new BadRequestException('No tour info found for id' + id)
    }

    const deletedTourInfo = await this.prisma.tourInfo.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedTourInfo))

  }


}
