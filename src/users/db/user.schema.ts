import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'users' })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop()
  name: string;

  @Prop()
  login: string;

  @Prop()
  avatar_url: string;
}
