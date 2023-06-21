import { PermissionService } from '../../services/permission/permission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AppPermission } from '../../shared/permissions.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permission } from '@models/permission.entity';
import { Get, Query } from '@nestjs/common';
import { Required } from '@decorators/required-permission.decorator';
import { Route } from '@decorators/route.decorator';

@ApiBearerAuth()
@Route(ControllerPrefix.PERMISSIONS)
export class PermissionController {
  constructor(private readonly _permissionService: PermissionService) {}

  @Get()
  @Required(AppPermission.PERMISSION_READ)
  findAll(@Query('full') full?: boolean): Promise<string[] | Permission[]> {
    return this._permissionService.findAll(full);
  }
}
