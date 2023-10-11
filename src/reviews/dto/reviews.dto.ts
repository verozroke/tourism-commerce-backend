import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string
  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string

  @IsNotEmpty()
  @IsString()
  userId: string
}


export class UpdateReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  text: string
}