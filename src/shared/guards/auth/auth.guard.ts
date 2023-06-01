import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService, private readonly _configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this._jwtService.verifyAsync(token, {
        secret: this._configService.get<string>('security.secretKey'),
      });
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.get('authorization')?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
