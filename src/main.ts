import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  const host = process.env.HOST;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  // dto validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger
  setupSwagger(app);
  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`,
  );
}

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('My-shop APIs ')
    .setDescription('API Specifications')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
}

bootstrap();
