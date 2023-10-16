import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request, Response } from 'express';
import { CreateTagDto, UpdateTagDto } from './dto/tags.dto';


@Injectable()
export class TagsService {

  constructor(private prisma: PrismaService) { }


  async getTags(req: Request, res: Response) {
    const tags = await this.prisma.tag.findMany()
    return res.send(JSON.stringify(tags))
  }

  async getTagById(id: string, req: Request, res: Response) {
    const foundTag = await this.prisma.tag.findUnique({
      where: {
        id,
      }
    })

    if (!foundTag) {
      throw new BadRequestException('No tag found for id' + id)
    }

    const Tag = await this.prisma.tag.findUnique({
      where: {
        id,
      }
    })
    return res.send(JSON.stringify(Tag))
  }

  async createTag(dto: CreateTagDto, req: Request, res: Response) {
    const tag = await this.prisma.tag.create({
      data: dto
    })

    return res.send(JSON.stringify(tag))

  }

  async updateTag(id: string, dto: UpdateTagDto, req: Request, res: Response) {

    const foundTag = await this.prisma.tag.findUnique({
      where: {
        id,
      }
    })

    if (!foundTag) {
      throw new BadRequestException('No tag found for id' + id)
    }

    const updatedTag = await this.prisma.tag.update({
      where: {
        id,
      },
      data: dto
    })

    return res.send(JSON.stringify(updatedTag))
  }

  async deleteTag(id: string, req: Request, res: Response) {

    const foundTag = await this.prisma.tag.findUnique({
      where: {
        id,
      }
    })

    if (!foundTag) {
      throw new BadRequestException('No tag found for id' + id)
    }

    const deletedTag = await this.prisma.tag.delete({
      where: {
        id,
      }
    })

    return res.send(JSON.stringify(deletedTag))

  }


}
