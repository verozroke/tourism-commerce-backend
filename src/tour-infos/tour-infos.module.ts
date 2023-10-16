import { Module } from '@nestjs/common';
import { TourInfosService } from './tour-infos.service';
import { TourInfosController } from './tour-infos.controller';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

@Module({
  controllers: [TourInfosController],
  providers: [TourInfosService, JwtStrategy],
})
export class TourInfosModule { }
