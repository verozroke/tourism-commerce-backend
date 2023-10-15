import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsDate } from "class-validator";

export type RegTourStatusType = 'pending' | 'closed'

export class CreateRegisteredTourDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date

  @IsNotEmpty()
  @IsString()
  travelers: string

  @IsNotEmpty()
  @IsString()
  transports: string

  @IsNotEmpty()
  @IsString()
  status: RegTourStatusType

  @IsNotEmpty()
  @IsString()
  tourInfoId: string

  @IsNotEmpty()
  @IsString()
  userId: string
}


export class UpdateRegisteredTourDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date

  @IsNotEmpty()
  @IsString()
  travelers: string

  @IsNotEmpty()
  @IsString()
  transports: string
}