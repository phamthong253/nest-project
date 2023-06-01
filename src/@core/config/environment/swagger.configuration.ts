import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  title: process.env.SWG_TITLE,
  version: process.env.SWG_VERSION,
}));
