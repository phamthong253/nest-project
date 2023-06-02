import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UpdateUserDto } from '../../dtos/updateUset.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { Route } from '@decorators/route.decorator';
import { User } from '@models/user.entity';
import { AppPermission } from 'src/modules/security/shared/permissions.enum';
import { Required } from '@decorators/required-permission.decorator';

@ApiBearerAuth()
@Route(ControllerPrefix.USERS)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @Required(AppPermission.USER_READ)
  findAll(): Promise<User[]> {
    return this._userService.findAll({ roles: { id: true, name: true, enabled: true } });
  }

  @Get(':id')
  @Required(AppPermission.USER_READ)
  findById(@Param('id') id: string): Promise<User | null> {
    return this._userService.findBy({ id }, { password: false, roles: { id: true, name: true, enabled: true } });
  }

  @Post()
  @Required(AppPermission.USER_MODIFY)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._userService.create(createUserDto);
  }

  @Patch(':id')
  @Required(AppPermission.USER_MODIFY)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this._userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Required(AppPermission.USER_DELETE)
  delete(@Param('id') id: string): Promise<Partial<User>> {
    return this._userService.delete(id);
  }
}
