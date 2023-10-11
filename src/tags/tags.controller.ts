import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateTagDto, UpdateTagDto } from './dto/tags.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Get()
  getTags(@Req() req: Request, @Res() res: Response) {
    return this.tagsService.getTags(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tag/:id')
  getTagById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tagsService.getTagById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/tag')
  createTag(@Req() req: Request, @Body() dto: CreateTagDto, @Res() res: Response) {
    return this.tagsService.createTag(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/tag/:id')
  updateTag(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateTagDto, @Res() res: Response) {
    return this.tagsService.updateTag(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/tag/:id')
  deleteTag(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.tagsService.deleteTag(params.id, req, res)
  }
}
