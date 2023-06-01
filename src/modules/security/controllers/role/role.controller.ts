import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from '../../services/role/role.service';
import { Route } from '@decorators/route.decorator';
import { Role } from '@models/role.entity';
import { Get } from '@nestjs/common';

@ApiBearerAuth()
@Route(ControllerPrefix.ROLES)
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this._roleService.findAll();
  }
}
