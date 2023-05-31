import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder().setTitle('Commission API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('server.port') || 3000);
}

bootstrap();
