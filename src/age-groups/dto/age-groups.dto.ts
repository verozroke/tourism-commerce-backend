import { IsNotEmpty, IsString } from "class-validator";

export class CreateAgeGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateAgeGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string
}