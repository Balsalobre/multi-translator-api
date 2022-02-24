import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UserResponseDto } from '../dto/userResponse';
import { TokenService } from '../../token/token.service';
import { AuthService } from '../auth.service';
import { UserDocument } from '../../users/schemas/user.schema';

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
  ): Promise<UserResponseDto> {
    if (!profile) throw new ForbiddenException('Access Denied');
    const { id } = profile;
    const user = (await this.authService.validateUser(id)) as UserDocument;
    if (!user) {
      const newUser = await this.authService.createUserFromGithub(profile);
      const tokens = await this.tokenService.getTokens(newUser);
      return new UserResponseDto({ ...newUser, tokens });
    }

    return new UserResponseDto({
      ...user.toJSON(),
      tokens: await this.tokenService.getTokens(user)
    });
  }
}
