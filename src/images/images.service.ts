import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateImageDto, UpdateImageDto } from './dto/images.dto';


@Injectable()
export class ImagesService {

  constructor(private prisma: PrismaService) { }


  async getImages(req: Request, res: Response) {
    const images = await this.prisma.image.findMany()
    return res.send(JSON.stringify(images))
  }

  async getImageById(id: string, req: Request, res: Response) {
    const foundImage = await this.prisma.image.findUnique({
      where: {
        id,
      }
    })

    if (!foundImage) {
      throw new BadRequestException('No image found for id' + id)
    }

    const Image = await this.prisma.image.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Image))
  }

  async createImage(dto: CreateImageDto, req: Request, res: Response) {
    const image = await this.prisma.image.create({
      data: dto
    })

    return res.send(JSON.stringify(image))

  }

  async updateImage(id: string, dto: UpdateImageDto, req: Request, res: Response) {

    const foundImage = await this.prisma.image.findUnique({
      where: {
        id,
      }
    })

    if (!foundImage) {
      throw new BadRequestException('No image found for id' + id)
    }

    const updatedImage = await this.prisma.image.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedImage))
  }

  async deleteImage(id: string, req: Request, res: Response) {

    const foundImage = await this.prisma.image.findUnique({
      where: {
        id,
      }
    })

    if (!foundImage) {
      throw new BadRequestException('No image found for id' + id)
    }

    const deletedImage = await this.prisma.image.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedImage))

  }


}
