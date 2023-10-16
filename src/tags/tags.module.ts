import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

@Module({
  controllers: [TagsController],
  providers: [TagsService, JwtStrategy],
})
export class TagsModule { }
