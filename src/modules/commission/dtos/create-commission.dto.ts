import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  imageSrc: string;

  @IsNotEmpty()
  @IsString()
  typeId: string;

  @IsNotEmpty()
  @IsString()
  toUserId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
