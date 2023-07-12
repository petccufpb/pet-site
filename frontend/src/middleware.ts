import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  /* Redirecionar usuários para /SDC,
    IMPORTANTE: REMOVER ESSE CÓDIGO DEPOIS
    QUE O RESTO DO SITE ESTIVER PRONTO. */
  if (!request.nextUrl.pathname.startsWith("/sdc") || request.nextUrl.pathname === "/sdc/admin") {
    return NextResponse.redirect(new URL("/sdc", request.url), {
      // IMPORTANTE: Se mantermos o default (301), os navegadores irão
      // cachear o redirecionamento e não irão atualizar o cache quando
      // pararmos de fazer este redirecionamento.
      status: 302,
    });
  }

  if (request.nextUrl.pathname.startsWith("/sdc/frequencia")) {
    const res = NextResponse.next();

    let ip = request.ip ?? request.headers.get("x-real-ip");
    const forwardedFor = request.headers.get("x-forwarded-for");

    if (!ip && forwardedFor) {
      ip = forwardedFor.split(",").at(0) ?? "Unknown";
    }

    console.log("ip", ip);

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
