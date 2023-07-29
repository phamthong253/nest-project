import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: { origin: ['http://localhost:5173', 'http://localhost:4200'] } });
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
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(configService.get<number>('server.port') || 3000);
}

bootstrap();
