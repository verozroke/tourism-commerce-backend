import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateRegisteredTourDto, UpdateRegisteredTourDto } from './dto/registered-tours.dto';


@Injectable()
export class RegisteredToursService {

  constructor(private prisma: PrismaService) { }


  async getRegisteredTours(req: Request, res: Response) {
    const registeredTours = await this.prisma.registeredTour.findMany()
    return res.send(JSON.stringify(registeredTours))
  }

  async getPendingTours(userId: string, req: Request, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const registeredTours = await this.prisma.tourInfo.findMany({
      where: {
        registeredTours: {
          some: {
            userId,
            status: 'pending'
          }
        }
      }
    })

    return res.send(registeredTours)
  }

  async getClosedTours(userId: string, req: Request, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      }
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const registeredTours = await this.prisma.tourInfo.findMany({
      where: {
        registeredTours: {
          some: {
            userId,
            status: 'closed'
          }
        }
      }
    })

    return res.send(registeredTours)
  }

  async getRegisteredTourById(id: string, req: Request, res: Response) {
    const foundRegisteredTour = await this.prisma.registeredTour.findUnique({
      where: {
        id,
      }
    })

    if (!foundRegisteredTour) {
      throw new BadRequestException('No registeredTour found for id' + id)
    }

    const RegisteredTour = await this.prisma.registeredTour.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(RegisteredTour))
  }

  async createRegisteredTour(dto: CreateRegisteredTourDto, req: Request, res: Response) {
    const registeredTour = await this.prisma.registeredTour.create({
      data: dto
    })

    return res.send(JSON.stringify(registeredTour))

  }

  async updateRegisteredTour(id: string, dto: UpdateRegisteredTourDto, req: Request, res: Response) {

    const foundRegisteredTour = await this.prisma.registeredTour.findUnique({
      where: {
        id,
      }
    })

    if (!foundRegisteredTour) {
      throw new BadRequestException('No registeredTour found for id' + id)
    }

    const updatedRegisteredTour = await this.prisma.registeredTour.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedRegisteredTour))
  }

  async deleteRegisteredTour(id: string, req: Request, res: Response) {

    const foundRegisteredTour = await this.prisma.registeredTour.findUnique({
      where: {
        id,
      }
    })

    if (!foundRegisteredTour) {
      throw new BadRequestException('No registeredTour found for id' + id)
    }

    const deletedRegisteredTour = await this.prisma.registeredTour.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedRegisteredTour))

  }


}
