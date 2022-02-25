import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'access-token'
    )
    .setTitle('Multi-traslator')
    .setDescription('The translator of multiple languages which will save you time')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true
    }
  };
  SwaggerModule.setup('api', app, document, customOptions);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
