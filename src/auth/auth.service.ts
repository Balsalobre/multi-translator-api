import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-github2';
import { UsersService } from '../users/users.service';
import { IUser } from '../users/entities/user.entity';
import { Tokens } from '../token/types';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private tokenService: TokenService) {}

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
      provider: 'github'
    });
  }

  async logout(userId): Promise<void> {
    await this.userService.updateUser(userId, { hashedRefreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string): Promise<Tokens> {
    return await this.tokenService.refreshTokens(userId, refreshToken);
  }
}
