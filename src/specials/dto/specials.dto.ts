import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpecialDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateSpecialDto {
  @IsNotEmpty()
  @IsString()
  name: string
}