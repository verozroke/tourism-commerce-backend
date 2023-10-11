import { Module } from '@nestjs/common';
import { InclusionsService } from './inclusions.service';
import { InclusionsController } from './inclusions.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [InclusionsController],
  providers: [InclusionsService, JwtStrategy],
})
export class InclusionsModule { }
