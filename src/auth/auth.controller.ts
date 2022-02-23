import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import GithubGuard from '../common/guards/github.guard';
import { User } from '../common/decorators/User';
import { AuthService } from './auth.service';
import { UserResponse } from './dto/userResponse';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GithubGuard)
  @Get('/github')
  loginByGithub(): void {
    return;
  }

  // Documentation: (for example, by injecting the response object to only set cookies/headers but still leave the rest to the framework),
  // you must set the passthrough option to true in the @Res({ passthrough: true }) decorator.
  @UseGuards(GithubGuard)
  @Get('/github/callback')
  async githubCallback(@User() user: UserResponse, @Res({ passthrough: true }) res) {
    res.cookie('token', user.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7
    });
    return { token: user.token };
  }

  // @Get('signout')
  // getSignOut(@Req() req: Request) {
  //   return this.authService.signout(req);
  // }
}
