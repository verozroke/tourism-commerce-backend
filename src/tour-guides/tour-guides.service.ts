import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateTourGuideDto, UpdateTourGuideDto } from './dto/tour-guides.dto';


@Injectable()
export class TourGuidesService {

  constructor(private prisma: PrismaService) { }


  async getTourGuides(req: Request, res: Response) {
    const tourGuides = await this.prisma.tourGuide.findMany()
    return res.send(JSON.stringify(tourGuides))
  }

  async getTourGuideById(id: string, req: Request, res: Response) {
    const foundTourGuide = await this.prisma.tourGuide.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourGuide) {
      throw new BadRequestException('No tour guide found for id' + id)
    }

    const TourGuide = await this.prisma.tourGuide.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(TourGuide))
  }

  async createTourGuide(dto: CreateTourGuideDto, req: Request, res: Response) {
    const { fullname } = dto

    const foundTourGuide = await this.prisma.tourGuide.findUnique({
      where: {
        fullname,
      }
    })

    if (foundTourGuide) {
      throw new BadRequestException('Existing tour')
    }

    const tourGuide = await this.prisma.tourGuide.create({
      data: dto
    })

    return res.send(JSON.stringify(tourGuide))

  }

  async updateTourGuide(id: string, dto: UpdateTourGuideDto, req: Request, res: Response) {

    const foundTourGuide = await this.prisma.tourGuide.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourGuide) {
      throw new BadRequestException('No tour guide found for id' + id)
    }

    const updatedTourGuide = await this.prisma.tourGuide.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedTourGuide))
  }

  async deleteTourGuide(id: string, req: Request, res: Response) {

    const foundTourGuide = await this.prisma.tourGuide.findUnique({
      where: {
        id,
      }
    })

    if (!foundTourGuide) {
      throw new BadRequestException('No tour guide found for id' + id)
    }

    const deletedTourGuide = await this.prisma.tourGuide.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedTourGuide))

  }


}
