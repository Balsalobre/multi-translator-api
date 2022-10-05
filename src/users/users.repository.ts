import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
  // async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
  //   return this.userModel.findOne(userFilterQuery);
  // }

  // async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
  //   return this.userModel.find(usersFilterQuery);
  // }

  // async create(user: User): Promise<User> {
  //   const newUser = new this.userModel(user);
  //   return newUser.save();
  // }

  // async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
  //   return this.userModel.findOneAndUpdate(userFilterQuery, user);
  // }
}
