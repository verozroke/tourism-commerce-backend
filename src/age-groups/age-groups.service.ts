import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateAgeGroupDto, UpdateAgeGroupDto } from './dto/age-groups.dto';


@Injectable()
export class AgeGroupsService {

  constructor(private prisma: PrismaService) { }


  async getAgeGroups(req: Request, res: Response) {
    const ageGroups = await this.prisma.ageGroup.findMany()
    return res.send(JSON.stringify(ageGroups))
  }

  async getAgeGroupById(id: string, req: Request, res: Response) {
    const foundAgeGroup = await this.prisma.ageGroup.findUnique({
      where: {
        id,
      }
    })

    if (!foundAgeGroup) {
      throw new BadRequestException('No ageGroup found for id' + id)
    }

    const AgeGroup = await this.prisma.ageGroup.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(AgeGroup))
  }

  async createAgeGroup(dto: CreateAgeGroupDto, req: Request, res: Response) {
    const ageGroup = await this.prisma.ageGroup.create({
      data: dto
    })

    return res.send(JSON.stringify(ageGroup))

  }

  async updateAgeGroup(id: string, dto: UpdateAgeGroupDto, req: Request, res: Response) {

    const foundAgeGroup = await this.prisma.ageGroup.findUnique({
      where: {
        id,
      }
    })

    if (!foundAgeGroup) {
      throw new BadRequestException('No ageGroup found for id' + id)
    }

    const updatedAgeGroup = await this.prisma.ageGroup.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedAgeGroup))
  }

  async deleteAgeGroup(id: string, req: Request, res: Response) {

    const foundAgeGroup = await this.prisma.ageGroup.findUnique({
      where: {
        id,
      }
    })

    if (!foundAgeGroup) {
      throw new BadRequestException('No ageGroup found for id' + id)
    }

    const deletedAgeGroup = await this.prisma.ageGroup.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedAgeGroup))

  }


}
