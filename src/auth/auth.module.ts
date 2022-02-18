import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import TokenModule from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/github.strategy';

@Module({
  imports: [UsersModule, TokenModule, ConfigModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService]
})
export class AuthModule {}
