import { Injectable } from '@nestjs/common';
import { ObjectId } from 'bson';
import { IdentifiableEntitySchema } from '../../database/identifiable-entity.schema';

@Injectable()
export class UserSchemaFactory implements IdentifiableEntitySchema {
  _id: ObjectId;
}
