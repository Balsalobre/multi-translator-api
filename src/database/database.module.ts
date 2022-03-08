import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './mongoose-config.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    })
  ]
})
export class DatabaseModule {}
