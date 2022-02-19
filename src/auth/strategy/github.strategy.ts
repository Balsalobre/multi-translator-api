import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UserResponse } from '../dto/userResponse';
import { UsersService } from '../../users/users.service';
import { TokenService } from '../../token/token.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private tokenService: TokenService, private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<UserResponse> {
    const { id } = profile;
    const user = await this.authService.validateUser(id);
    if (!user) {
      const newUser = await this.authService.createUserFromGithub(profile);
      return new UserResponse({ ...newUser, token: this.tokenService.createToken(user) });
    }
    return new UserResponse({ ...user, token: this.tokenService.createToken(user) });
  }
}
