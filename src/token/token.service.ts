import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponse } from '../auth/dto/userResponse';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  createToken(user: UserResponse) {
    const payload: UserResponse = {
      id: user.id,
      userName: user.userName,
      gitId: user.gitId,
      avatarUrl: user.avatarUrl,
      fullName: user.fullName
    };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
