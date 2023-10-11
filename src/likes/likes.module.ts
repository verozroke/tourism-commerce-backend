import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [LikesController],
  providers: [LikesService, JwtStrategy],
})
export class LikesModule { }
