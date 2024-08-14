import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const prefix = process.env.PREFIX || 'api';
  const version = process.env.VERSION || 'v1';

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(`${prefix}/${version}`);

  const config = new DocumentBuilder()
    .addTag('Nest-Restful-API')
    .setTitle('Nest-Restful-API')
    .setDescription('Restful APi, Authentication and Authorization with JWT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${prefix}/${version}`,
  );
}
bootstrap();
