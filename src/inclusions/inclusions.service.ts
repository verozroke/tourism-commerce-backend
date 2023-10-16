import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateInclusionDto, UpdateInclusionDto } from './dto/inclusions.dto';


@Injectable()
export class InclusionsService {

  constructor(private prisma: PrismaService) { }


  async getInclusions(req: Request, res: Response) {
    const inclusions = await this.prisma.inclusion.findMany()
    return res.send(JSON.stringify(inclusions))
  }

  async getInclusionById(id: string, req: Request, res: Response) {
    const foundInclusion = await this.prisma.inclusion.findUnique({
      where: {
        id,
      }
    })

    if (!foundInclusion) {
      throw new BadRequestException('No inclusion found for id' + id)
    }

    const Inclusion = await this.prisma.inclusion.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Inclusion))
  }

  async createInclusion(dto: CreateInclusionDto, req: Request, res: Response) {
    const inclusion = await this.prisma.inclusion.create({
      data: dto
    })

    return res.send(JSON.stringify(inclusion))

  }

  async updateInclusion(id: string, dto: UpdateInclusionDto, req: Request, res: Response) {

    const foundInclusion = await this.prisma.inclusion.findUnique({
      where: {
        id,
      }
    })

    if (!foundInclusion) {
      throw new BadRequestException('No inclusion found for id' + id)
    }

    const updatedInclusion = await this.prisma.inclusion.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedInclusion))
  }

  async deleteInclusion(id: string, req: Request, res: Response) {

    const foundInclusion = await this.prisma.inclusion.findUnique({
      where: {
        id,
      }
    })

    if (!foundInclusion) {
      throw new BadRequestException('No inclusion found for id' + id)
    }

    const deletedInclusion = await this.prisma.inclusion.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedInclusion))

  }


}
