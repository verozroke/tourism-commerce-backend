import { IsNotEmpty, IsString } from "class-validator";

export class CreateDurationDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateDurationDto {
  @IsNotEmpty()
  @IsString()
  name: string
}