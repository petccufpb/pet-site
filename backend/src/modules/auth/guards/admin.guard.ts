import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

import AdminAuthService from "../services/admin-auth.service";

@Injectable()
export default class AdminGuard implements CanActivate {
  private readonly logger = new Logger(AdminGuard.name);

  constructor(private readonly adminAuthService: AdminAuthService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request & { admin?: unknown }>();

    const cookieName = this.adminAuthService.getCookieName();
    const token = (req.cookies as Record<string, string>)?.[cookieName];

    if (!token) {
      throw new UnauthorizedException("Autenticação necessária");
    }

    try {
      const payload = this.adminAuthService.verifyToken(token);

      if (payload.role !== "admin") {
        throw new UnauthorizedException("Acesso negado");
      }

      req.admin = payload;
      return true;
    } catch (err) {
      this.logger.debug(`AdminGuard rejected token: ${(err as Error).message}`);
      throw new UnauthorizedException("Token inválido ou expirado");
    }
  }
}
