import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommissionDto {
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
