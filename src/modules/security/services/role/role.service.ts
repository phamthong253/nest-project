import { DataSource, FindOptionsSelect, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from '../../dtos/update-role.dto';
import { CreateRoleDto } from '../../dtos/create-role.dto';
import { ObjectHelper } from '@helpers/object.helper';
import { Role } from '@models/role.entity';
import { User } from '@models/user.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly _roleRepo: Repository<Role>, private readonly _dataSource: DataSource) {}

  async findAll(select?: FindOptionsSelect<Role>): Promise<Role[]> {
    let _select: FindOptionsSelect<Role> = {
      id: true,
      name: true,
      createTime: true,
      updateTime: true,
      description: true,
      enabled: true,
      permissions: false,
    };

    if (select) {
      _select = { ..._select, ...select };
    }

    return await this._roleRepo.find({ select: _select, relations: { permissions: !!_select.permissions }, where: { deleteTime: IsNull() } });
  }

  async findByUserId(userId: string): Promise<string[]> {
    const roleNameList: string[] = [];
    const roleNames = await this._dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .select('role.name', 'roleName')
      .innerJoin('user.roles', 'role')
      .where('user.id = :id AND role.enabled = true AND role.deleteTime IS NULL', { id: userId })
      .getRawMany<{ roleName: string }>();

    for (const { roleName } of roleNames) {
      roleNameList.push(roleName);
    }

    return roleNameList;
  }

  async findOneBy(where: FindOptionsWhere<Role>, select?: FindOptionsSelect<Role>): Promise<Role | null> {
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

  async create(createRoleDto: CreateRoleDto, userId: string): Promise<Role> {
    const role = this._roleRepo.create(createRoleDto);
    const modifyUser = { id: userId };

    return await this._roleRepo.save({ ...role, updatedBy: modifyUser, createdBy: modifyUser });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, userId: string): Promise<Partial<Role>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Role is deleted or does not exist.');
    }

    return await this._roleRepo.save({
      id,
      ...ObjectHelper.filterEmptyProps(UpdateRoleDto, updateRoleDto),
      updateTime: Date.now(),
      updatedBy: { id: userId },
    });
  }

  async delete(id: string, userId: string): Promise<Partial<Role>> {
    if (!(await this._existId(id))) {
      throw new BadRequestException('Role is deleted or does not exist.');
    }

    const now = Date.now();
    const modifyUser = { id: userId };

    return await this._roleRepo.save({ id, deleteTime: now, updateTime: now, updatedBy: modifyUser, deletedBy: modifyUser });
  }

  private _existId(id: string): Promise<boolean> {
    try {
      return this._roleRepo.exist({ where: { id, deleteTime: IsNull() } });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
