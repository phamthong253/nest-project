import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '../../dtos/updateRole.dto';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { ObjectHelper } from '@helpers/object.helper';
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

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Partial<Role>> {
    if (!(await this._roleRepo.exist({ where: { id } }))) {
      throw new BadRequestException();
    }

    return await this._roleRepo.save({ id, ...ObjectHelper.filterEmptyProps(UpdateRoleDto, updateRoleDto) });
  }
}
