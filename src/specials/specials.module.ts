import { Module } from '@nestjs/common';
import { SpecialsService } from './specials.service';
import { SpecialsController } from './specials.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [SpecialsController],
  providers: [SpecialsService, JwtStrategy],
})
export class SpecialsModule { }
