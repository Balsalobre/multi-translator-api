import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import GithubGuard from '../common/guards/github.guard';
import { User } from '../common/decorators/User';
import { AuthService } from './auth.service';
import { UserResponse } from './dto/userResponse';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(GithubGuard)
  @Get('/login')
  loginByGithub(@User() user: UserResponse) {
    return;
  }

  @UseGuards(GithubGuard)
  @Get('/github/callback')
  async githubCallback(@User() user: UserResponse, @Res({ passthrough: true }) response) {
    response.cookie('token', user.token, {
      maxAge: 603800,
      httpOnly: true
    });
    return `<script>window.opener.postMessage('${JSON.stringify(
      user
    )}','*');window.close();</script>`;
  }
}
