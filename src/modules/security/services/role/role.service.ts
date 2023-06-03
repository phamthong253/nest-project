import { FindOptionsSelect, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '../../dtos/updateRole.dto';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { Role } from '@models/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly _roleRepo: Repository<Role>) {}

  async findAll(select?: FindOptionsSelect<Role>): Promise<Role[]> {
    let _select = { id: true, name: true, createTime: true, updateTime: true, description: true, enabled: true };

    if (select) {
      _select = { ..._select, ...select };
    }

    return await this._roleRepo.find({ select: _select, where: { deleteTime: IsNull() } });
  }

  async findBy(where: FindOptionsWhere<Role>, select?: FindOptionsSelect<Role>): Promise<Role | null> {
    let _select = { id: true, name: true, createTime: true, updateTime: true, description: true, enabled: true };

    if (select) {
      _select = { ..._select, ...select };
    }

    try {
      return await this._roleRepo.findOne({
        select: _select,
        relations: { permissions: true },
        where: { ...where, deleteTime: IsNull() },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
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
