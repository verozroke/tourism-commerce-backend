import { IsNotEmpty, IsString } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string

  @IsNotEmpty()
  @IsString()
  alt: string

  @IsNotEmpty()
  @IsString()
  tourInfoId: string
}


export class UpdateImageDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string

  @IsNotEmpty()
  @IsString()
  alt: string

}