import { Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { GithubGuard, RtGuard } from '../common/guards';
import { User } from '../common/decorators/User';
import { AuthService } from './auth.service';
import { UserResponseDto } from './dto/userResponse';
import { Tokens } from '../token/types/index';
import { GetCurrentUserId, GetCurrentUser, Public } from '../common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(GithubGuard)
  @Get('github')
  @HttpCode(HttpStatus.CREATED)
  loginByGithub(): void {
    return;
  }

  @Public()
  @UseGuards(GithubGuard)
  @Get('github/callback')
  @HttpCode(HttpStatus.OK)
  async githubCallback(@User() user: UserResponseDto): Promise<Tokens> {
    return { ...user.tokens };
  }

  @Post('logout')
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string): Promise<void> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
