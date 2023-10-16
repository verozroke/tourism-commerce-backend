import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { FaqsService } from './faqs.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { CreateFaqDto, UpdateFaqDto } from './dto/faqs.dto';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) { }

  @Get()
  getFaqs(@Req() req: Request, @Res() res: Response) {
    return this.faqsService.getFaqs(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/faq/:id')
  getFaqById(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.faqsService.getFaqById(params.id, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Post('/faq')
  createFaq(@Req() req: Request, @Body() dto: CreateFaqDto, @Res() res: Response) {
    return this.faqsService.createFaq(dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/faq/:id')
  updateFaq(@Param() params: { id: string }, @Req() req: Request, @Body() dto: UpdateFaqDto, @Res() res: Response) {
    return this.faqsService.updateFaq(params.id, dto, req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/faq/:id')
  deleteFaq(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.faqsService.deleteFaq(params.id, req, res)
  }
}
