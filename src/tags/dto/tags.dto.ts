import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string
}