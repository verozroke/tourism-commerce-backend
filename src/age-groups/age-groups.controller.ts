import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AgeGroupsService } from './age-groups.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { CreateAgeGroupDto, UpdateAgeGroupDto } from './dto/age-groups.dto';

@Controller('ageGroups')
export class AgeGroupsController {
  constructor(private readonly ageGroupsService: AgeGroupsService) { }

  @Get()
  getAgeGroups(@Req() req: Request, @Res() res: Response) {
    return this.ageGroupsService.getAgeGroups(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ageGroup/:id')
  getAgeGroupById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.ageGroupsService.getAgeGroupById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/ageGroup')
  createAgeGroup(@Req() req: Request, @Body() dto: CreateAgeGroupDto, @Res() res: Response) {
    return this.ageGroupsService.createAgeGroup(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/ageGroup/:id')
  updateAgeGroup(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateAgeGroupDto, @Res() res: Response) {
    return this.ageGroupsService.updateAgeGroup(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/ageGroup/:id')
  deleteAgeGroup(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.ageGroupsService.deleteAgeGroup(params.id, req, res)
  }
}
