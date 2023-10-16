import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateSpecialDto, UpdateSpecialDto } from './dto/specials.dto';


@Injectable()
export class SpecialsService {

  constructor(private prisma: PrismaService) { }


  async getSpecials(req: Request, res: Response) {
    const specials = await this.prisma.special.findMany()
    return res.send(JSON.stringify(specials))
  }

  async getSpecialById(id: string, req: Request, res: Response) {
    const foundSpecial = await this.prisma.special.findUnique({
      where: {
        id,
      }
    })

    if (!foundSpecial) {
      throw new BadRequestException('No special found for id' + id)
    }

    const Special = await this.prisma.special.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Special))
  }

  async createSpecial(dto: CreateSpecialDto, req: Request, res: Response) {
    const special = await this.prisma.special.create({
      data: dto
    })

    return res.send(JSON.stringify(special))

  }

  async updateSpecial(id: string, dto: UpdateSpecialDto, req: Request, res: Response) {

    const foundSpecial = await this.prisma.special.findUnique({
      where: {
        id,
      }
    })

    if (!foundSpecial) {
      throw new BadRequestException('No special found for id' + id)
    }

    const updatedSpecial = await this.prisma.special.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedSpecial))
  }

  async deleteSpecial(id: string, req: Request, res: Response) {

    const foundSpecial = await this.prisma.special.findUnique({
      where: {
        id,
      }
    })

    if (!foundSpecial) {
      throw new BadRequestException('No special found for id' + id)
    }

    const deletedSpecial = await this.prisma.special.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedSpecial))

  }


}
