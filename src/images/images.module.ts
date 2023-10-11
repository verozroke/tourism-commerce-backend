import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, JwtStrategy],
})
export class ImagesModule { }
