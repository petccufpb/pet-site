import helmet from "@fastify/helmet";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  await app.register(helmet);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("API do PET.CC (UFPB)")
    .setDescription("Dados do PET (Programa de Educação Tutorial) do curso Ciência da Computação, da UFPB.")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  const port = process.env.PORT || 3333;

  await app.listen(port, "0.0.0.0");

  console.log(`Server started on port ${port}!`);
};

bootstrap();
