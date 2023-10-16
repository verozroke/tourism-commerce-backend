import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TourInfosModule } from './tour-infos/tour-infos.module';
import { TourGuidesModule } from './tour-guides/tour-guides.module';
import { EmailModule } from './emails/email.module';
import { AgeGroupsModule } from './age-groups/age-groups.module';
import { DurationsModule } from './durations/durations.module';
import { FaqsModule } from './faqs/faqs.module';
import { ImagesModule } from './images/images.module';
import { InclusionsModule } from './inclusions/inclusions.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { LikesModule } from './likes/likes.module';
import { RegisteredToursModule } from './registered-tours/registered-tours.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SpecialsModule } from './specials/specials.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    TourInfosModule,
    TourGuidesModule,
    EmailModule,
    AgeGroupsModule,
    DurationsModule,
    FaqsModule,
    ImagesModule,
    InclusionsModule,
    ItinerariesModule,
    LikesModule,
    RegisteredToursModule,
    ReviewsModule,
    SpecialsModule,
    TagsModule,
    TourGuidesModule,
  ],
})
export class AppModule { }
