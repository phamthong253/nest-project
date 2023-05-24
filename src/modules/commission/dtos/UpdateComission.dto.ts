import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateComissionDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imageSrc: string;

  @IsOptional()
  @IsString()
  typeId: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
