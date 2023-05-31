import { PermissionService } from '../../services/permission/permission.service';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { Permission } from '@models/permission.entity';
import { Route } from '@decorators/route.decorator';
import { Get } from '@nestjs/common';

@Route(ControllerPrefix.PERMISSIONS)
export class PermissionController {
  constructor(private readonly _permisionService: PermissionService) {}

  @Get()
  findAll(): Promise<Permission[]> {
    return this._permisionService.findAll();
  }
}
