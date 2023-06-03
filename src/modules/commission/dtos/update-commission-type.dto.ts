import { IsOptional } from 'class-validator';

export class UpdateCommissionTypeDto {
  @IsOptional()
  name: string;
}
