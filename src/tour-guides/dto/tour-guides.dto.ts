import { IsNotEmpty, IsString } from "class-validator";

export class CreateTourGuideDto {
  @IsNotEmpty()
  @IsString()
  fullname: string

  @IsNotEmpty()
  @IsString()
  about: string

  @IsNotEmpty()
  @IsString()
  journey: string

  @IsNotEmpty()
  @IsString()
  facebookLink: string

  @IsNotEmpty()
  @IsString()
  instagramLink: string

  @IsNotEmpty()
  @IsString()
  twitterLink: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}


export class UpdateTourGuideDto {
  @IsNotEmpty()
  @IsString()
  fullname: string

  @IsNotEmpty()
  @IsString()
  about: string

  @IsNotEmpty()
  @IsString()
  journey: string

  @IsNotEmpty()
  @IsString()
  facebookLink: string

  @IsNotEmpty()
  @IsString()
  instagramLink: string

  @IsNotEmpty()
  @IsString()
  twitterLink: string

  @IsNotEmpty()
  @IsString()
  imageUrl: string
}