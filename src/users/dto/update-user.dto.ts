import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  gitId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  fullName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  userName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  provider?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  hashedRefreshToken?: string;
}
