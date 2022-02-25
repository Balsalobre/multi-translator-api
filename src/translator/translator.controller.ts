import { Controller, Get, Body, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTranslationDto } from './dto/translator.dto';
import { TranslatorService } from './translator.service';

@ApiTags('Translator')
@ApiBearerAuth('access-token')
@Controller('translator')
export class TranslatorController {
  constructor(private translatorService: TranslatorService) {}

  @Get('/metadata')
  @ApiResponse({ status: 200, description: 'Returns used document metadata.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getMetadata(@Res() res) {
    const metadata = await this.translatorService.metadata();
    return res.status(HttpStatus.OK).json(metadata);
  }

  @Post('/')
  @ApiBody({ type: CreateTranslationDto })
  @ApiCreatedResponse({ description: 'The translation has been done successfully.' })
  async createTranslation(@Res() res, @Body() createTranslationDTO: CreateTranslationDto) {
    console.log({ createTranslationDTO });
    const createTranslation = await this.translatorService.createTranslation(createTranslationDTO);
    return res.status(HttpStatus.OK).json(createTranslation);
  }

  @Get('/')
  @ApiResponse({ status: 200, description: 'Returns all translations.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getTranslations(@Res() res) {
    const data = await this.translatorService.traslations();
    return res.status(HttpStatus.OK).json(data);
  }
}
