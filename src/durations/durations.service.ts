import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateDurationDto, UpdateDurationDto } from './dto/durations.dto';


@Injectable()
export class DurationsService {

  constructor(private prisma: PrismaService) { }


  async getDurations(req: Request, res: Response) {
    const durations = await this.prisma.duration.findMany()
    return res.send(JSON.stringify(durations))
  }

  async getDurationById(id: string, req: Request, res: Response) {
    const foundDuration = await this.prisma.duration.findUnique({
      where: {
        id,
      }
    })

    if (!foundDuration) {
      throw new BadRequestException('No duration found for id' + id)
    }

    const Duration = await this.prisma.duration.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Duration))
  }

  async createDuration(dto: CreateDurationDto, req: Request, res: Response) {

    const duration = await this.prisma.duration.create({
      data: dto
    })

    return res.send(JSON.stringify(duration))

  }

  async updateDuration(id: string, dto: UpdateDurationDto, req: Request, res: Response) {

    const foundDuration = await this.prisma.duration.findUnique({
      where: {
        id,
      }
    })

    if (!foundDuration) {
      throw new BadRequestException('No duration found for id' + id)
    }

    const updatedDuration = await this.prisma.duration.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedDuration))
  }

  async deleteDuration(id: string, req: Request, res: Response) {

    const foundDuration = await this.prisma.duration.findUnique({
      where: {
        id,
      }
    })

    if (!foundDuration) {
      throw new BadRequestException('No duration found for id' + id)
    }

    const deletedDuration = await this.prisma.duration.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedDuration))

  }


}
