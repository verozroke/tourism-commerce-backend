import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // FIXME: доработай хуйню, в чем его смыслл блять?
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

  @Get()
  getUsers() {
    return this.usersService.getUsers()
  }
}
