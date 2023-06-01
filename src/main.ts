import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // OpenAPI Configs
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title') || 'unknown')
    .setVersion(configService.get<string>('swagger.version') || '1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('server.port') || 3000);
}

bootstrap();
