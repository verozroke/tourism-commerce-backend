import { Body, Controller, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { ChangeEmailDto, ChangeNameDto, ChangePasswordDto, UploadAvatarDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  getUserById(@Param() params: { id: string }, @Req() req: Request) {
    return this.usersService.getUserById(params.id, req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/hash')
  getUserByHash(@Req() req: Request) {
    return this.usersService.getUserByHash(req)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/avatar')
  uploadAvatar(@Param() params: { id: string }, @Body() body: UploadAvatarDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.uploadAvatar(params, body, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/name')
  changeName(@Param() params: { id: string }, @Body() body: ChangeNameDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.changeName(params, body, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/email')
  changeEmail(@Param() params: { id: string }, @Body() body: ChangeEmailDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.changeEmail(params, body, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/password')
  changePassword(@Param() params: { id: string }, @Body() body: ChangePasswordDto, @Req() req: Request, @Res() res: Response) {
    return this.usersService.changePassword(params, body, req, res)
  }

}
