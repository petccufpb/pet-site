import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import AdminAuthService from "@modules/auth/services/admin-auth.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // 1. Prioridade: Cookie HttpOnly
    const cookieName = this.adminAuthService.getCookieName();
    const cookieToken = request.cookies?.[cookieName];

    if (cookieToken) {
      try {
        const payload = this.adminAuthService.verifyToken(cookieToken);
        if (payload.role === "admin") {
          request.admin = payload;
          return true;
        }
      } catch (err) {
        // Se o cookie for inválido, prossegue para o fallback
      }
    }

    // 2. Fallback: Basic Auth (para Swagger / chamadas externas)
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Basic ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = Buffer.from(token, "base64").toString("utf-8");
        const [username, password] = decoded.split(":");

        const usersEnv = process.env.SWAGGER_USERS || "[]";
        const usersList = JSON.parse(usersEnv) as string[][];

        const userFound = usersList.find(([u, p]) => u === username && p === password);

        if (userFound) {
          return true;
        }
      } catch {}
    }

    throw new UnauthorizedException("Acesso não autorizado: autenticação necessária");
  }
}
