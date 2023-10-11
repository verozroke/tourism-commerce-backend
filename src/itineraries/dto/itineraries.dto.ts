import { IsNotEmpty, IsString } from "class-validator";

export class CreateItineraryDto {
  @IsNotEmpty()
  @IsString()
  dayNumber: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateItineraryDto {
  @IsNotEmpty()
  @IsString()
  dayNumber: string

  @IsNotEmpty()
  @IsString()
  text: string
}