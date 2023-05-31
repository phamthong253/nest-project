import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

// configs
import databaseConfiguration from '@config/database.configuration';
import serverConfiguration from '@config/server.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [serverConfiguration, databaseConfiguration] }),
    DatabaseModule,
    CommissionModule,
  ],
})
export class AppModule {}
