import { Module } from '@nestjs/common';
import { DurationsService } from './durations.service';
import { DurationsController } from './durations.controller';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

@Module({
  controllers: [DurationsController],
  providers: [DurationsService, JwtStrategy],
})
export class DurationsModule { }
