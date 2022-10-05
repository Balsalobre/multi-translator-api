import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../auth/dto/userResponse';
import { Tokens } from './types/index';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async getTokens(user: UserResponseDto): Promise<Tokens> {
    const payload: UserResponseDto = {
      id: user.id,
      userName: user.userName,
      gitId: user.gitId,
      avatarUrl: user.avatarUrl,
      fullName: user.fullName
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_AJWT_KEY,
        expiresIn: 60 * 15
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_RJWT_KEY,
        expiresIn: 60 * 60 * 24 * 7
      })
    ]);
    await this.updateRtHash(user.gitId, refreshToken);
    return { accessToken, refreshToken };
  }

  async updateRtHash(userId: string, refreshToken: string): Promise<void> {
    const hash = await argon.hash(refreshToken);
    await this.usersService.updateUser(userId, { hashedRefreshToken: hash });
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.hashedRefreshToken) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRefreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRtHash(user.gitId, tokens.refreshToken);

    return tokens;
  }
}
