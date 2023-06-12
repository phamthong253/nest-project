import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EncryptService } from '../encrypt/encrypt.service';
import { CreateUserDto } from 'src/modules/user/dtos/create-user.dto';
import { UserService } from 'src/modules/user/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@models/user.entity';
import { SignInResDto } from '../../dtos/sign-in-res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _encryptService: EncryptService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = (await this._userService.findBy({ username }, { password: true })) as User | null;

    if (!user) {
      throw new BadRequestException('username does not exist.');
    }

    const isMatched = await this._encryptService.compare(pass, user.password);

    if (!isMatched) {
      throw new BadRequestException('Wrong password.');
    }

    return new SignInResDto({ accessToken: await this._jwtService.signAsync({ sub: user.id, username: user.username }) });
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this._userService.create(createUserDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
