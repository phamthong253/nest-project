import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from '@config/environment/app.configuration';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SecurityModule } from './modules/security/security.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: appConfigs, isGlobal: true }),
    DatabaseModule,
    CommissionModule,
    UserModule,
    SecurityModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
