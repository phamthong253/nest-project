import { ISignInRes } from '../interfaces/ISignInRes.interface';

export class SignInResDto implements ISignInRes {
  accessToken: string;

  constructor({ accessToken }: ISignInRes) {
    this.accessToken = accessToken;
  }
}
