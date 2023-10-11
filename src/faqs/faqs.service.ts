import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateFaqDto, UpdateFaqDto } from './dto/faqs.dto';


@Injectable()
export class FaqsService {

  constructor(private prisma: PrismaService) { }


  async getFaqs(req: Request, res: Response) {
    const faqs = await this.prisma.faq.findMany()
    return res.send(JSON.stringify(faqs))
  }

  async getFaqById(id: string, req: Request, res: Response) {
    const foundFaq = await this.prisma.faq.findUnique({
      where: {
        id,
      }
    })

    if (!foundFaq) {
      throw new BadRequestException('No faq found for id' + id)
    }

    const Faq = await this.prisma.faq.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Faq))
  }

  async createFaq(dto: CreateFaqDto, req: Request, res: Response) {
    const faq = await this.prisma.faq.create({
      data: dto
    })

    return res.send(JSON.stringify(faq))

  }

  async updateFaq(id: string, dto: UpdateFaqDto, req: Request, res: Response) {

    const foundFaq = await this.prisma.faq.findUnique({
      where: {
        id,
      }
    })

    if (!foundFaq) {
      throw new BadRequestException('No faq found for id' + id)
    }

    const updatedFaq = await this.prisma.faq.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedFaq))
  }

  async deleteFaq(id: string, req: Request, res: Response) {

    const foundFaq = await this.prisma.faq.findUnique({
      where: {
        id,
      }
    })

    if (!foundFaq) {
      throw new BadRequestException('No faq found for id' + id)
    }

    const deletedFaq = await this.prisma.faq.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedFaq))

  }


}
