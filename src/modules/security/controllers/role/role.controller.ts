import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppPermission } from '../../shared/permissions.enum';
import { RoleService } from '../../services/role/role.service';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';
import { Role } from '@models/role.entity';
import { Get } from '@nestjs/common';

@ApiBearerAuth()
@Route(ControllerPrefix.ROLES)
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  @Required(AppPermission.USER_READ)
  findAll(): Promise<Role[]> {
    return this._roleService.findAll();
  }
}
