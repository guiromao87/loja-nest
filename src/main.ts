import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  await app.listen(3000);


  // Função do class-validator pra usar o contexto de injeção do nest
  // Tenta resolver as dependencias igual o Nest, caso n consiga tem um segundo
  // parametro pra usar o proprio container dele(validator)
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

}


bootstrap();
