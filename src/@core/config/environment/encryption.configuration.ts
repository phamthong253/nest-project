import { registerAs } from '@nestjs/config';

export default registerAs('encrypt', () => ({
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  secretKey: process.env.SECRET_KEY,
  secretKeyExpr: process.env.SECRET_KEY_EXPR,
}));
