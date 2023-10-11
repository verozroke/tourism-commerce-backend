import { IsNotEmpty, IsString } from "class-validator";

export class CreateLikeDto {


  @IsNotEmpty()
  @IsString()
  tourInfoId: string

  @IsNotEmpty()
  @IsString()
  userId: string
}


export class UpdateLikeDto {

}