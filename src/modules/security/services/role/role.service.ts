import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '../../dtos/updateRole.dto';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { Role } from '@models/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly _roleRepo: Repository<Role>) {}

  async findAll(): Promise<Role[]> {
    const select = { id: true, name: true, createTime: true, deleteTime: true, description: true, enabled: true };

    return await this._roleRepo.find({ select, where: { deleteTime: IsNull() } });
  }

  async findBy(where: Partial<Role>): Promise<Role | null> {
    const select = { id: true, name: true, createTime: true, deleteTime: true, description: true, enabled: true };

    try {
      return await this._roleRepo.findOne({
        select,
        relations: { permissions: true },
        where: { ...where, deleteTime: IsNull() },
      });
    } catch (err) {
      throw new InternalServerErrorException(err.err);
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this._roleRepo.create(createRoleDto);

    return await this._roleRepo.save(role);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Partial<Role>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Role is deleted or does not exist.');
    }

    return await this._roleRepo.save({
      id,
      ...ObjectHelper.filterEmptyProps(UpdateRoleDto, updateRoleDto),
      updateTime: Date.now(),
    });
  }

  async delete(id: string): Promise<Partial<Role>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Role is deleted or does not exist.');
    }

    const now = Date.now();

    return await this._roleRepo.save({ id, deleteTime: now, updateTime: now });
  }

  private _existId(id: string): Promise<boolean> {
    try {
      return this._roleRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
