import { IsNotEmpty } from 'class-validator';

export class CreateCommissionTypeDto {
  @IsNotEmpty()
  name: string;
}
