import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async getUserById(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException()
    }

    const decodedUser = req.user as { id: string, email: string }
    if (user.id !== decodedUser.id) {
      throw new ForbiddenException()
    }


    delete user.hashedPassword


    return { user }
  }

  async getUserByHash(req: Request) {

    const decodedUser = req.user as { id: string, email: string }
    const user = await this.prisma.user.findUnique({ where: { id: decodedUser.id } })
    if (!user) {
      throw new NotFoundException()
    }

    delete user.hashedPassword

    return { user }
  }


  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }
}
