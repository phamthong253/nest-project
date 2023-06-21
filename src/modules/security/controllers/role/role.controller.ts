import { Body, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { FindOptionsSelect } from 'typeorm';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { UtilityRequest } from 'src/shared/utility.type';
import { AppPermission } from '../../shared/permissions.enum';
import { CreateRoleDto } from '../../dtos/create-role.dto';
import { UpdateRoleDto } from '../../dtos/update-role.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from '../../services/role/role.service';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';
import { Role } from '@models/role.entity';

@ApiBearerAuth()
@Route(ControllerPrefix.ROLES)
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  @Required(AppPermission.ROLE_READ)
  findAll(@Query() options?: Record<string, any>): Promise<Role[]> {
    let select: FindOptionsSelect<Role> = {};

    if (options?.compact) {
      select = { ...select, createTime: false, updateTime: false, description: false };
    }

    if (options?.permissions) {
      select = { ...select, permissions: { id: true } };
    }

    return this._roleService.findAll(select);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this._roleService.findOneBy({ id });
  }

  @Post()
  @Required(AppPermission.ROLE_MODIFY)
  create(@Body() createRoleDto: CreateRoleDto, @Req() { user }: UtilityRequest): Promise<Role> {
    return this._roleService.create(createRoleDto, user.id);
  }

  @Patch(':id')
  @Required(AppPermission.ROLE_MODIFY)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() { user }: UtilityRequest): Promise<Partial<Role>> {
    return this._roleService.update(id, updateRoleDto, user.id);
  }

  @Delete(':id')
  @Required(AppPermission.ROLE_MODIFY)
  delete(@Param('id') id: string, @Req() { user }: UtilityRequest): Promise<Partial<Role>> {
    return this._roleService.delete(id, user.id);
  }
}
