import { Module } from '@nestjs/common';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [ItinerariesController],
  providers: [ItinerariesService, JwtStrategy],
})
export class ItinerariesModule { }
