import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthSingupDto, AuthSinginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async signup(dto: AuthSingupDto) {
    const { email, name, password } = dto

    const foundUser = await this.prisma.user.findUnique({ where: { email: email } })

    if (foundUser) {
      throw new BadRequestException('Email already taken')
    }

    const hashedPassword = await this.hashPassword(password)

    await this.prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    })

    return {
      message: 'Signed up successfully'
    }
  }
  async signin(dto: AuthSinginDto, req: Request, res: Response) {
    const { email, password } = dto

    const foundUser = await this.prisma.user.findUnique({ where: { email: email } })

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials')
    }

    const isMatch = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword
    })

    if (!isMatch) {
      throw new BadRequestException('Passwords does not match')
    }


    const token = await this.signToken({ id: foundUser.id, email: foundUser.email })

    if (!token) {
      throw new ForbiddenException()
    }

    res.cookie('token', token)


    return res.send({ message: 'Signed in successfully' });
  }
  async signout(req: Request, res: Response) {

    res.clearCookie('token')

    return res.send({ message: 'Signed out successfully' })
  }


  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  }


  async comparePasswords(args: { password: string, hash: string }) {
    return await bcrypt.compare(args.password, args.hash)
  }

  async signToken(args: { id: string, email: string }) {
    const payload = args

    return this.jwt.signAsync(payload, { secret: jwtSecret })
  }
}
