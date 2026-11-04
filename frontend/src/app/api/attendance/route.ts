import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // `manual` é exclusivo do painel admin; o fluxo do aluno nunca o repassa
  const { manual: _manual, ...params } = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/attendance", {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
      Origin: req.headers.get("Origin")!,
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
