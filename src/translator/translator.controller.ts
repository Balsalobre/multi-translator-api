import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { TranslatorService } from './translator.service';

@Controller('translator')
export class TranslatorController {
  constructor(private translatorService: TranslatorService) {}

  @Post('/create')
  async createTranslation(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'OK'
    });
  }

  @Get('/metadata')
  async getMetadata(@Res() res) {
    const metadata = await this.translatorService.metadata();
    return res.status(HttpStatus.OK).json(metadata);
  }
}
