import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  /* Redirecionar usuários para /SDC,
    IMPORTANTE: REMOVER ESSE CÓDIGO DEPOIS
    QUE O RESTO DO SITE ESTIVER PRONTO. */
  if (!request.nextUrl.pathname.startsWith("/sdc")) {
    return NextResponse.redirect(new URL("/sdc", request.url));
  }

  if (
    request.nextUrl.pathname === "/sdc/inscricao" ||
    request.nextUrl.pathname.startsWith("/sdc/minicurso") ||
    request.nextUrl.pathname === "/sdc/certificado"
  ) {
    return NextResponse.rewrite(new URL("/sdc/em-breve", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|images).*)"],
};
