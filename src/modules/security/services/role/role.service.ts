import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '@models/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly _roleRepo: Repository<Role>) {}

  async findAll(): Promise<Role[]> {
    return await this._roleRepo.find({ relations: { permissions: true } });
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return await this._roleRepo.findOneBy({ name });
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this._roleRepo.create(createRoleDto);

    return await this._roleRepo.save(role);
  }
}
