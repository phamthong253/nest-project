import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComissionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  imageSrc: string;

  @IsNotEmpty()
  @IsString()
  typeId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
