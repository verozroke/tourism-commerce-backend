import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [FaqsController],
  providers: [FaqsService, JwtStrategy],
})
export class FaqsModule { }
