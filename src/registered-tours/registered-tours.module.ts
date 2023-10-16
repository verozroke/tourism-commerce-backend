import { Module } from '@nestjs/common';
import { RegisteredToursService } from './registered-tours.service';
import { RegisteredToursController } from './registered-tours.controller';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

@Module({
  controllers: [RegisteredToursController],
  providers: [RegisteredToursService, JwtStrategy],
})
export class RegisteredToursModule { }
