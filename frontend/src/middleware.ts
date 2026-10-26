import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = process.env.COOKIE_NAME ?? "pet_admin_token";

/**
 * Verifica estrutura e expiração do JWT de sessão do admin sem validar a
 * assinatura (o Edge não tem acesso ao segredo de forma segura/obrigatória).
 * A validação criptográfica acontece no backend, via AdminGuard.
 */
function hasAdminSession(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return false;

  const parts = token.split(".");

  if (parts.length !== 3) return false;

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as { exp?: number };

    if (typeof payload.exp === "number" && payload.exp <= Math.floor(Date.now() / 1000)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export default function middleware(request: NextRequest) {
  /* Redirecionar usuários para /SDC,
    IMPORTANTE: REMOVER ESSE CÓDIGO DEPOIS
    QUE O RESTO DO SITE ESTIVER PRONTO. */
  /* if (!request.nextUrl.pathname.startsWith("/sdc") || request.nextUrl.pathname === "/sdc/admin") {
    return NextResponse.redirect(new URL("/sdc", request.url), {
      // IMPORTANTE: Se mantermos o default (301), os navegadores irão
      // cachear o redirecionamento e não irão atualizar o cache quando
      // pararmos de fazer este redirecionamento.
      status: 302,
    });
  } */

  const { pathname } = request.nextUrl;

  // Proteger todas as rotas administrativas; a tela de login fica acessível
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!pathname.startsWith("/admin/login")) {
      if (!hasAdminSession(request)) {
        const loginUrl = new URL("/admin/login", request.url);
        const nextPath = `${pathname}${request.nextUrl.search}`;

        loginUrl.searchParams.set("next", nextPath);

        return NextResponse.redirect(loginUrl);
      }
    }
  }

  if (pathname.startsWith("/sdc/frequencia")) {
    const res = NextResponse.next();

    let ip = request.ip ?? request.headers.get("x-real-ip");
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (!ip && forwardedFor) {
      ip = forwardedFor.split(",").at(0) ?? "Unknown";
    }

    if (ip) {
      res.headers.set("x-user-ip", ip);
    }

    return res;
  }

  /* if (
    request.nextUrl.pathname === "/sdc/inscricao" ||
    request.nextUrl.pathname.startsWith("/sdc/minicurso") ||
    request.nextUrl.pathname === "/sdc/certificado"
  ) {
    return NextResponse.rewrite(new URL("/sdc/em-breve", request.url));
  } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|images).*)"],
};
