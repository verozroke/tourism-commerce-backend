import { Module } from '@nestjs/common';
import { EmailController } from './email.controller'
import { EmailService } from './email.service'
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [EmailController],
  providers: [EmailService, JwtStrategy],
})
export class EmailModule { }
