import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';
import { UserModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TranslatorModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
