import { Body, Get, Post, Req } from '@nestjs/common';
import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from '../../dtos/sign-in.dto';
import { Public } from '@decorators/public-route.decorator';
import { Route } from '@decorators/route.decorator';
import { PermissionService } from '../../services/permission/permission.service';

@Route(ControllerPrefix.AUTH)
export class AuthController {
  constructor(private readonly _authService: AuthService, private readonly _permissionService: PermissionService) {}

  @Get()
  getUserPermission(@Req() { user }: Record<keyof Request | 'user', any>): Promise<string[]> {
    return this._permissionService.findByUserId(user.userId);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() { username, password }: SignInDto): Promise<{ accessToken: string }> {
    return this._authService.signIn(username, password);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    await this._authService.signUp(createUserDto);

    return this._authService.signIn(createUserDto.username, createUserDto.password);
  }
}
