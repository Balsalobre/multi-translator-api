import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const userAndPass = `${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}`;
    const url = `${process.env.MONGO_INITDB_URL}`;
    const port = `${process.env.MONGO_INITDB_PORT}`;
    const uri = `mongodb://${userAndPass}@${url}:${port}/`;

    return { uri };
  }
}
