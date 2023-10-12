import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

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
  oldPassword: string

  @IsNotEmpty()
  @IsString()
  newPassword: string
}