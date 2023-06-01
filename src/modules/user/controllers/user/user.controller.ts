import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UpdateUserDto } from '../../dtos/updateUset.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../../services/user/user.service';
import { Route } from '@decorators/route.decorator';
import { User } from '@models/user.entity';

@ApiBearerAuth()
@Route(ControllerPrefix.USERS)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User | Omit<User, 'password'> | null> {
    return this._userService.findBy({ id }, true);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this._userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    return this._userService.update(id, updateUserDto);
  }
}
