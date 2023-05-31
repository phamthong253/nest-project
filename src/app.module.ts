import { CommissionModule } from './modules/commission/commission.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

// configs
import databaseConfiguration from './shared/config/database.configuration';
import serverConfiguration from './shared/config/server.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [serverConfiguration, databaseConfiguration] }),
    DatabaseModule,
    CommissionModule,
  ],
  providers: [AppService],
})
export class AppModule {}
