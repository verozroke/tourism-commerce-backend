import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express'
import { CreateEmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) { }


  async getEmails(req: Request, res: Response) {
    const emails = await this.prisma.email.findMany()
    return res.send(JSON.stringify(emails))
  }

  async createEmail(dto: CreateEmailDto, req: Request, res: Response) {
    const { email: bodyEmail } = dto

    const foundEmail = await this.prisma.email.findUnique({
      where: {
        email: bodyEmail
      }
    })

    if (foundEmail) {
      throw new BadRequestException('Email already exist')
    }

    await this.prisma.email.create({
      data: { email: bodyEmail }
    })

    return res.send({ message: 'Email submitted successfully. We will reply to you soon.' })
  }

  async deleteEmail(@Param() params: { id: string }, req: Request, res: Response) {
    const { id } = params

    const foundEmail = await this.prisma.email.findUnique({
      where: {
        id
      }
    })

    if (!foundEmail) {
      throw new BadRequestException('Email doesn\'t exist')
    }

    await this.prisma.email.delete({
      where: {
        id
      }
    })

    return res.send({ message: 'Email deleted successfully.' })
  }
}
