import { ControllerPrefix } from '../../shared/controller-prefix.enum';
import { AuthService } from '../../services/auth/auth.service';
import { Body, Post } from '@nestjs/common';
import { SignInDto } from '../../dtos/signIn.dto';
import { Route } from '@decorators/route.decorator';

@Route(ControllerPrefix.AUTH)
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  signIn(@Body() { username, password }: SignInDto) {
    return this._authService.signIn(username, password);
  }
}
