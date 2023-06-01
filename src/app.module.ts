import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from '@config/environment/app.configuration';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SecurityModule } from './modules/security/security.module';

@Module({
  imports: [ConfigModule.forRoot({ load: appConfigs }), DatabaseModule, CommissionModule, UserModule, SecurityModule],
})
export class AppModule {}
