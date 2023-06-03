import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { hash as bHash, compare as bCompare } from 'bcrypt';

@Injectable()
export class EncryptService {
  private readonly saltRounds: number;

  constructor(private readonly _configService: ConfigService) {
    this.saltRounds = this._configService.get<number>('encrypt.saltRounds') || 10;
  }

  compare(str: string, hash: string): Promise<boolean> {
    return bCompare(str, hash);
  }

  hash(str: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bHash(str, this.saltRounds, (err, encryptedStr) => {
        if (err) {
          reject(err.message);
        }

        resolve(encryptedStr);
      });
    });
  }
}
