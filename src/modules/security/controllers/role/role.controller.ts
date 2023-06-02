import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AppPermission } from '../../shared/permissions.enum';
import { CreateRoleDto } from '../../dtos/createRole.dto';
import { UpdateRoleDto } from '../../dtos/updateRole.dto';
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
  findAll(): Promise<Role[]> {
    return this._roleService.findAll();
  }

  @Post()
  @Required(AppPermission.ROLE_MODIFY)
  create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this._roleService.create(createRoleDto);
  }

  @Patch(':id')
  @Required(AppPermission.ROLE_MODIFY)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Partial<Role>> {
    return this._roleService.update(id, updateRoleDto);
  }
}
