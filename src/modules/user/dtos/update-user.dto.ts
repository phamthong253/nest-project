import { IsArray, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Role } from '@models/role.entity';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Role)
  roles: Role[];
}
