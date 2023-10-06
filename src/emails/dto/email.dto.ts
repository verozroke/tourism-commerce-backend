import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string

}

