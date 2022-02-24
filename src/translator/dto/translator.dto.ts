import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly sourceLanguage: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
