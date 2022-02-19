import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-github2';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(userId: string): Promise<IUser> {
    const user = await this.userService.getUserById(userId);
    return user ? user : null;
  }

  async createUserFromGithub({ id, username, displayName, photos }: Profile): Promise<IUser> {
    return await this.userService.createUser({
      gitId: id,
      userName: username,
      fullName: displayName,
      avatarUrl: photos[0].value,
      isActive: false
    });
  }
}
