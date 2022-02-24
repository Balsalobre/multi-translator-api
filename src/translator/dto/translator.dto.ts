import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranslationDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly sourceLanguage: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
