import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigs } from '@config/app.configuration';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot({ load: appConfigs }), DatabaseModule, CommissionModule],
})
export class AppModule {}
