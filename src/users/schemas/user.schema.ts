import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../entities/user.entity';

export type UserDocument = User & Document;
@Schema({ collection: 'users', timestamps: true })
export class User implements IUser {
  @Prop()
  readonly gitId: string;

  @Prop()
  readonly fullName: string;

  @Prop()
  readonly avatarUrl: string;

  @Prop()
  readonly isActive: boolean;

  @Prop()
  readonly userName: string;

  // @Prop()
  // provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
