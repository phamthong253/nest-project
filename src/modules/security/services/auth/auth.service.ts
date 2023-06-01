import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptService } from '../encrypt/encrypt.service';
import { UserService } from 'src/modules/user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@models/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UserService,
    private readonly _encryptService: EncryptService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = (await this._usersService.findBy({ username })) as User | null;

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatched = await this._encryptService.compare(pass, user.password);

    if (!isMatched) {
      throw new UnauthorizedException();
    }

    return { accessToken: await this._jwtService.signAsync({ sub: user.id, username: user.username }) };
  }
}
