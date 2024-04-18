import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const env = configService.get('ENV');

  const port = configService.get('PORT');

  if (env === 'DEV') {
    const config = new DocumentBuilder()
      .setTitle('Dekulcreacion API')
      .setDescription('API for dekulcreacion app')
      .setVersion('1.0')
      .addTag('Init')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(port, '0.0.0.0');
}
bootstrap();
