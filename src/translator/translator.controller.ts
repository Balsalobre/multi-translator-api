import { Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('translator')
export class TranslatorController {
  @Post('/create')
  createTranslation(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'OK',
    });
  }
}
