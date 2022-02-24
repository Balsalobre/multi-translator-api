import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { AccessJwtStrategy, RefreshJwtStrategy } from './strategies/index';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [TokenService, AccessJwtStrategy, RefreshJwtStrategy],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('PRIVATE_KEY'),
        signOptions: { expiresIn: '60h' }
      }),
      inject: [ConfigService]
    }),
    UsersModule
  ],
  exports: [TokenService, JwtModule]
})
export default class TokenModule {}
