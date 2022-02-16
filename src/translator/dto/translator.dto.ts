import { ApiProperty } from '@nestjs/swagger';
export class CreateTranslationDTO {
  @ApiProperty({ required: true })
  readonly sourceLanguage: string;

  @ApiProperty({ required: true })
  readonly text: string;
}
