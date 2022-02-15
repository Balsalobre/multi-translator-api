import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorModule } from './translator/translator.module';

@Module({
  imports: [ConfigModule.forRoot(), TranslatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
