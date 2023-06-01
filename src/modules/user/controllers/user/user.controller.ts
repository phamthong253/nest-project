import { Body, Get, Post } from '@nestjs/common';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CreateUserDto } from '../../dtos/createUser.dto';
import { UserService } from '../../services/user/user.service';
import { Route } from '@decorators/route.decorator';
import { User } from '@models/user.entity';

@Route(ControllerPrefix.USERS)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this._userService.create(createUserDto);
  }
}
