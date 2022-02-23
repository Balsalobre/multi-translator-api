import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserResponse } from '../auth/dto/userResponse';

const cookieExtractor = function (req): string | null {
  if (req && req.cookies) {
    return req.cookies['token'];
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.PRIVATE_KEY
    });
  }

  async validate(payload: UserResponse) {
    return payload;
  }
}
