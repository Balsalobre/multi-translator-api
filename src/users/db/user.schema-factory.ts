import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntitySchemaFactory } from '../../database/entity-schema.factory';
import { User } from './User';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory implements EntitySchemaFactory<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.id),
      name: user.name,
      login: user.login,
      avatar_url: user.avatar_url
    };
  }

  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.name,
      userSchema.login,
      userSchema.avatar_url
    );
  }
}
