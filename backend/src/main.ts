import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { RequestHandler } from "@nestjs/common/interfaces";
import { MiddlewareBuilder, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
import helmet from "helmet";

import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.use(helmet());
  // @ts-ignore
  app.use((req, res, next) => {
    // Disallow requests not from the frontend or for the favicon (Swagger)
    if (
      req.url !== "/favicon.ico" &&
      req.headers.origin !==
        process.env.WEB_URL?.replace(/https?:\/\/(www\.)?/g, "")
          .replace(/:\d+/g, "")
          .replace("/", "")
    ) {
      throw new HttpException(
        `You don't have permission to access this API. Host - ${req.hostname}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    next!();
  });

  // Enable authentication for Swagger
  app.use(
    "/docs*",
    expressBasicAuth({
      challenge: true,
      users: (JSON.parse(process.env.SWAGGER_USERS || "[]") as string[][]).reduce(
        (obj, [user, password]) => ({ ...obj, [user]: password }),
        {},
      ),
    }),
  );

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
