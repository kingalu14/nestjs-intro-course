import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerDocumentOptions,
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Intro')
    .setDescription('The NestJS Intro API description')
    .setVersion('1.0')
    .setTermsOfService('https://example.com/terms')
    .addTag('nestjs-intro')
    .build();

  //instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    orign: ['http://localhost:3000/api#/'],
    methods: 'GET,HEAD,PUT,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  //console.log(app);
}
bootstrap();
