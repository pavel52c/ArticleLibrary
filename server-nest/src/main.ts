import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Библиотека')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Created by _Ice_')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app
    .listen(PORT)
    .then(() => console.log(`Server started on port = ${PORT}`));
}

start();
