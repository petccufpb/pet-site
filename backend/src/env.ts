// Os decorators de @Module leem process.env (ex.: MAIL_DRIVER) no momento do import,
// antes do ConfigModule.forRoot() rodar, então o .env precisa ser carregado antes de tudo
import { config } from "dotenv";

config({
  path: [
    ".env.local",
    ".env",
    ...(process.env.NODE_ENV === "production"
      ? [".env.production.local", ".env.production"]
      : [".env.development.local", ".env.development"]),
  ],
  quiet: true,
});
