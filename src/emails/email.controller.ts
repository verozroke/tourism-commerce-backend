import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../../src/auth/jwt.guard';
import { Request, Response } from 'express';
import { CreateEmailDto } from './dto/email.dto';


@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getTourGuides(@Req() req: Request, @Res() res: Response) {
    return this.emailService.getEmails(req, res)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/email/:id')
  deleteEmail(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {
    return this.emailService.deleteEmail(params, req, res)
  }


  @Post('/email')
  createEmail(@Body() dto: CreateEmailDto, @Req() req: Request, @Res() res: Response) {
    return this.emailService.createEmail(dto, req, res)
  }
}
