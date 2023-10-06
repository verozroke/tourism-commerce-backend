import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTourInfoDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public location: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number

  @IsNotEmpty()
  @IsNumber()
  public rate: number

  @IsNotEmpty()
  @IsNumber()
  public rateAmount: number

  @IsNotEmpty()
  @IsString()
  public duration: string

  @IsNotEmpty()
  @IsString()
  public imageUrl: string
}


export class UpdateTourInfoDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public location: string;

  @IsNotEmpty()
  @IsNumber()
  public price: number

  @IsNotEmpty()
  @IsNumber()
  public rate: number

  @IsNotEmpty()
  @IsNumber()
  public rateAmount: number

  @IsNotEmpty()
  @IsString()
  public duration: string

  @IsNotEmpty()
  @IsString()
  public imageUrl: string
}