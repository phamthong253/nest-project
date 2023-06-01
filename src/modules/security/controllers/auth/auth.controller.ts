import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AuthService } from '../../services/auth/auth.service';
import { BadRequestException, Body, Post } from '@nestjs/common';
import { SignInDto } from '../../dtos/signIn.dto';
import { Public } from '@decorators/public-route.decorator';
import { Route } from '@decorators/route.decorator';
import { CreateUserDto } from 'src/modules/user/dtos/createUser.dto';

@Route(ControllerPrefix.AUTH)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() { username, password }: SignInDto) {
    return this._authService.signIn(username, password);
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    try {
      await this._authService.signUp(createUserDto);

      return this._authService.signIn(createUserDto.username, createUserDto.password);
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
