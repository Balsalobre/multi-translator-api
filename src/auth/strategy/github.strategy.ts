import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UserResponse } from '../dto/userResponse';
import { UsersService } from '../../users/users.service';
import { TokenService } from '../../token/token.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private userService: UsersService;
  private tokenService: TokenService;

  constructor(userService: UsersService, tokenService: TokenService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK
    });
    this.userService = userService;
    this.tokenService = tokenService;
  }

  async validate(accessToken: string, profile: Profile): Promise<UserResponse> {
    const candidate = await this.userService.getUserById(profile.id);
    if (candidate)
      return new UserResponse({ ...candidate, token: this.tokenService.createToken(candidate) });

    const user = await this.userService.createUser({
      gitId: Number(profile.id),
      userName: profile.username,
      fullName: profile.displayName,
      avatarUrl: profile.photos[0].value,
      isActive: false
    });
    return new UserResponse({ ...user, token: this.tokenService.createToken(user) });
  }
}
