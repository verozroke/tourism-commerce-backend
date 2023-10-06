import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthSingupDto {

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at beetween 8 and 20 characters' })
  public password: string;
}


export class AuthSinginDto {

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at beetween 8 and 20 characters' })
  public password: string;
}




