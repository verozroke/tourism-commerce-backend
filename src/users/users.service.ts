import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { ChangeEmailDto, ChangeNameDto, ChangePasswordDto, UploadAvatarDto } from './dto/users.dto';

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
    const user = await this.prisma.user.findUnique({ where: { id: decodedUser.id }, include: { likes: true, registeredTours: true, reviews: true } })
    if (!user) {
      throw new NotFoundException()
    }

    delete user.hashedPassword

    return { user }
  }

  async changePassword(@Param() params: { id: string }, @Body() body: ChangePasswordDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { newPassword, oldPassword } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    const isMatch = await this.comparePasswords({
      password: oldPassword,
      hash: foundUser.hashedPassword
    })

    if (!isMatch) {
      throw new BadRequestException('Incorrect password')
    }

    const hashedPassword = await this.hashPassword(newPassword)


    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      }
    })


    return res.send({ message: 'Changed password successfully' })

  }

  async changeName(@Param() params: { id: string }, @Body() body: ChangeNameDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { name } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      }
    })

    return res.send({ message: 'Changed name successfully' })
  }

  async changeEmail(@Param() params: { id: string }, @Body() body: ChangeEmailDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { email } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      }
    })

    return res.send({ message: 'Changed email successfully' })
  }

  async deleteUser(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {

    const { id } = params

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.delete({
      where: {
        id,
      }
    })

    return res.send({ message: 'User deleted successfully' })
  }

  async uploadAvatar(@Param() params: { id: string }, @Body() body: UploadAvatarDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params


    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        avatarUrl: body.avatarUrl
      }
    })

    return res.send({ message: 'Avatar uploaded successfully' })
  }


  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
        reviews: true,
        likes: true,
        registeredTours: true,
      }
    });
  }



  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  }


  async comparePasswords(args: { password: string, hash: string }) {
    return await bcrypt.compare(args.password, args.hash)
  }

}
