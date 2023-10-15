import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class UploadAvatarDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  avatarUrl: string
}


export class ChangeEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string
}


export class ChangeNameDto {
  @IsNotEmpty()
  @IsString()
  name: string
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at beetween 8 and 20 characters' })
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'Password has to be at beetween 8 and 20 characters' })
  newPassword: string
}