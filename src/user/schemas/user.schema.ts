import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  userId: string;

  @Prop()
  loging: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
