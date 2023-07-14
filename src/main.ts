import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();
  const APP_NAME = process.env.npm_package_name;
  const APP_VERSION = process.env.npm_package_version;
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setVersion(APP_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () =>
    console.log('🚦 Listening on port 3000 😎'),
  );
}
bootstrap();
