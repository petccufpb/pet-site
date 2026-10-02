import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function proxyHandler(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path ? params.path.join("/") : "";
  const targetUrl = `${BACKEND_URL}/${targetPath}${req.nextUrl.search}`;

  const forwardHeaders = new Headers();
  req.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== "host" && lowerKey !== "content-length") {
      forwardHeaders.set(key, value);
    }
  });

  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer();

  try {
    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body,
      redirect: "manual",
    });

    const responseHeaders = new Headers();
    backendRes.headers.forEach((value, key) => {
      if (!["transfer-encoding", "content-encoding"].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    // Copiar cookies garantindo compatibilidade First-Party
    const rawCookies = typeof backendRes.headers.getSetCookie === "function"
      ? backendRes.headers.getSetCookie()
      : [backendRes.headers.get("set-cookie")].filter(Boolean) as string[];

    const responseBody = await backendRes.arrayBuffer();
    const nextRes = new NextResponse(responseBody, {
      status: backendRes.status,
      statusText: backendRes.statusText,
      headers: responseHeaders,
    });

    for (const cookieStr of rawCookies) {
      nextRes.headers.append("set-cookie", cookieStr);
    }

    return nextRes;
  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json({ message: "Erro de conexão com o servidor de backend." }, { status: 502 });
  }
}

export const GET = proxyHandler;
export const POST = proxyHandler;
export const PATCH = proxyHandler;
export const DELETE = proxyHandler;
export const PUT = proxyHandler;
