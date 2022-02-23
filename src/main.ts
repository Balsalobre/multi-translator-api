import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Multi-traslator')
    .setDescription('The translator of multiple languages which will save you time')
    .setVersion('1.0')
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true
    }
  };

  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
