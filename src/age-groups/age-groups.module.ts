import { Module } from '@nestjs/common';
import { AgeGroupsService } from './age-groups.service';
import { AgeGroupsController } from './age-groups.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [AgeGroupsController],
  providers: [AgeGroupsService, JwtStrategy],
})
export class AgeGroupsModule { }
