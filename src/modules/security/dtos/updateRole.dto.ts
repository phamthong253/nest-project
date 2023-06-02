import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Permission } from '@models/permission.entity';
import { Type } from 'class-transformer';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => Permission)
  permissions?: Permission[];
}
