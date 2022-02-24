import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  gitId?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  userName?: string;

  @IsOptional()
  provider?: string;

  @IsOptional()
  hashedRefreshToken?: string;
}
