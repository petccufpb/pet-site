import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      throw new UnauthorizedException("Cabeçalho de autorização ausente ou inválido");
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      const [username, password] = decoded.split(":");

      const usersEnv = process.env.SWAGGER_USERS || "[]";
      const usersList = JSON.parse(usersEnv) as string[][];

      const userFound = usersList.find(([u, p]) => u === username && p === password);

      if (!userFound) {
        throw new UnauthorizedException("Usuário ou senha inválidos");
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException("Falha na autenticação");
    }
  }
}
