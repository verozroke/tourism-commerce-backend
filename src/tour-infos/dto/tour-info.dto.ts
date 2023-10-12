import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  @IsBoolean()
  public isFeatured?: boolean

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public activity: string;

  @IsNotEmpty()
  @IsString()
  public physical: string;

  @IsNotEmpty()
  @IsNumber()
  public groupSize: number

  @IsNotEmpty()
  @IsNumber()
  public season: number

  @IsNotEmpty()
  @IsString()
  public inclusionText: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date

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
  @IsBoolean()
  public isFeatured?: boolean
  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public activity: string;

  @IsNotEmpty()
  @IsString()
  public physical: string;

  @IsNotEmpty()
  @IsNumber()
  public groupSize: number

  @IsNotEmpty()
  @IsNumber()
  public season: number

  @IsNotEmpty()
  @IsString()
  inclusionText: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date

}