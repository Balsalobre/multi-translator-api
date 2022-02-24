import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Tokens } from '../../token/types';
export class UserResponseDto {
  @ApiProperty({ required: true })
  @IsString()
  readonly id?: number;

  @ApiProperty({ required: true })
  @IsString()
  readonly gitId?: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly fullName: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly avatarUrl: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly userName: string;

  @ApiProperty({ required: true })
  @IsString()
  readonly tokens?: Tokens;

  constructor(props: UserResponseDto) {
    this.userName = props.userName;
    this.avatarUrl = props.avatarUrl;
    this.fullName = props.fullName;
    this.gitId = props.gitId;
    this.tokens = props.tokens;
    this.id = props.id;
  }
}
