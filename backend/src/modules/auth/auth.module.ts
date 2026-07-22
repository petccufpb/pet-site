import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import type { StringValue } from "ms";

import AuthController from "./controllers/auth.controller";
import AdminGuard from "./guards/admin.guard";
import AdminLoginRateLimitGuard from "./guards/rate-limit.guard";
import AdminAuthService from "./services/admin-auth.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;
        if (!secret && process.env.NODE_ENV === "production") {
          throw new Error("JWT_SECRET is required in production");
        }
        const expiresIn = (process.env.JWT_EXPIRES_IN ?? "8h") as StringValue;
        return {
          secret: secret ?? "dev-secret-change-me",
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AdminAuthService, AdminGuard, AdminLoginRateLimitGuard],
  exports: [AdminAuthService, AdminGuard],
})
export class AuthModule {}
