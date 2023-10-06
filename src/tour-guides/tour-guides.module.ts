import { Module } from '@nestjs/common';
import { TourGuidesService } from './tour-guides.service';
import { TourGuidesController } from './tour-guides.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [TourGuidesController],
  providers: [TourGuidesService, JwtStrategy],
})
export class TourGuidesModule { }
