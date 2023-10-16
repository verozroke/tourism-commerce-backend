import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, JwtStrategy],
})
export class ReviewsModule { }
