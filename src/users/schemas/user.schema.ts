import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../entities/user.entity';

export type UserDocument = User & Document;
@Schema({ collection: 'users', timestamps: true })
export class User implements IUser {
  @Prop()
  gitId: number;

  @Prop()
  fullName: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  isActive: boolean;

  @Prop()
  userName: string;

  // @Prop()
  // provider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
