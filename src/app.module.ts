import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TourInfosModule } from './tour-infos/tour-infos.module';
import { TourGuidesModule } from './tour-guides/tour-guides.module';
import { EmailModule } from './emails/email.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, TourInfosModule, TourGuidesModule, EmailModule],
})
export class AppModule { }
