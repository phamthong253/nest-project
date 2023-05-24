import { IsNotEmpty } from 'class-validator';

export class CreateComissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageSrc: string;

  @IsNotEmpty()
  typeId: string;

  @IsNotEmpty()
  price: number;
}
