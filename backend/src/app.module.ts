import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

import { MembersModule } from "@modules/members/members.module";
import NewsModule from "@modules/news/news.module";
import ProjectsModule from "@modules/projects/projects.module";

import { MiscController } from "./controllers/misc.controller";

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      // @ts-ignore
      useFactory: async () => ({
        store: await redisStore({
          url: process.env.REDIS_URL,
          ttl: 1 * 1 * 5 * 60 * 1000, // 5 minutes
        }),
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: [
        ".env.local",
        ".env",
        ...(process.env.NODE_ENV === "production"
          ? [".env.production.local", ".env.prodution"]
          : [".env.development.local", ".env.development"]),
      ],
    }),
    ...[MembersModule, NewsModule, ProjectsModule],
  ],
  controllers: [MiscController],
  providers: [
    ...(process.env.RAILWAY_ENVIRONMENT === "development"
      ? []
      : [
          {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
          },
        ]),
  ],
})
export class AppModule {}
