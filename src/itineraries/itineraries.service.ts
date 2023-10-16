import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateItineraryDto, UpdateItineraryDto } from './dto/itineraries.dto';


@Injectable()
export class ItinerariesService {

  constructor(private prisma: PrismaService) { }


  async getItineraries(req: Request, res: Response) {
    const itineraries = await this.prisma.itinerary.findMany()
    return res.send(JSON.stringify(itineraries))
  }

  async getItineraryById(id: string, req: Request, res: Response) {
    const foundItineraries = await this.prisma.itinerary.findUnique({
      where: {
        id,
      }
    })

    if (!foundItineraries) {
      throw new BadRequestException('No itinerary found for id' + id)
    }

    const itinerary = await this.prisma.itinerary.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(itinerary))
  }

  async createItinerary(dto: CreateItineraryDto, req: Request, res: Response) {
    const itinerary = await this.prisma.itinerary.create({
      data: dto
    })

    return res.send(JSON.stringify(itinerary))

  }

  async updateItinerary(id: string, dto: UpdateItineraryDto, req: Request, res: Response) {

    const foundItinerary = await this.prisma.itinerary.findUnique({
      where: {
        id,
      }
    })

    if (!foundItinerary) {
      throw new BadRequestException('No itinerary found for id' + id)
    }

    const updatedItinerary = await this.prisma.itinerary.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedItinerary))
  }

  async deleteItinerary(id: string, req: Request, res: Response) {

    const foundItinerary = await this.prisma.itinerary.findUnique({
      where: {
        id,
      }
    })

    if (!foundItinerary) {
      throw new BadRequestException('No itinerary found for id' + id)
    }

    const deletedItinerary = await this.prisma.itinerary.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedItinerary))

  }


}
