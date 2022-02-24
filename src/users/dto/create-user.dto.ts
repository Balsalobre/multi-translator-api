import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  gitId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  avatarUrl: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  provider: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  token?: string;
}
