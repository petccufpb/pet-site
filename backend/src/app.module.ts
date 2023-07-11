import { CacheModule, CacheInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

import { MembersModule } from "@modules/members/members.module";
import ProjectsModule from "@modules/projects/projects.module";

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      // @ts-ignore
      useFactory: async () => ({
        store: await redisStore({
          password: process.env.REDIS_PASS,
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
          ttl: process.env.RAILWAY_ENVIRONMENT === "development" ? 1 : 1 * 1 * 5 * 60 * 1000, // 5 minutes
          username: process.env.REDIS_USER,
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
    MembersModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
