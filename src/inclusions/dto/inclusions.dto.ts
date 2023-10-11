import { IsNotEmpty, IsString } from "class-validator";

export class CreateInclusionDto {
  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmpty()
  @IsString()
  text: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateInclusionDto {
  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmpty()
  @IsString()
  text: string
}