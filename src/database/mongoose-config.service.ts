import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const mongoAtalasUri = `${process.env.MONGO_ATLAS_URI}`;
    return { uri: mongoAtalasUri };
  }
}
