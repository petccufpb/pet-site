import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
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

  const users = (JSON.parse(process.env.SWAGGER_USERS || "[]") as string[][]).reduce(
    (obj, [user, password]) => ({ ...obj, [user]: password }),
    {} as Record<string, string>,
  );

  app.use(helmet());
  // @ts-ignore
  app.use((req, res, next) => {
    const urlRegex = /(https?:\/\/)|(www.)|(\/$)/g;

    const [user, pass] = Buffer.from(req.headers.authorization.split("Basic ")[1], "base64")
      .toString()
      .split(":");

    // Allow simple GET requests and disallow requests not originated from the frontend or for Swagger's favicon
    if (
      req.method !== "GET" &&
      req.url !== "/favicon.ico" &&
      req.headers.origin?.replace(urlRegex, "") !== process.env.WEB_URL?.replace(urlRegex, "") &&
      !(users[user] && pass === users[user])
    ) {
      throw new HttpException(
        `You don't have permission to access this API. Host - ${req.headers.origin}`,
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
      users,
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
