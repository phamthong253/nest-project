import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { SignInResDto } from '../../dtos/sign-in-res.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Body, Post } from '@nestjs/common';
import { SignInDto } from '../../dtos/sign-in.dto';
import { Public } from '@decorators/public-route.decorator';
import { Route } from '@decorators/route.decorator';

@Route(ControllerPrefix.AUTH)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() { username, password }: SignInDto): Promise<SignInResDto> {
    return this._authService.signIn(username, password);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<SignInResDto> {
    await this._authService.signUp(createUserDto);

    return this._authService.signIn(createUserDto.username, createUserDto.password);
  }
}
