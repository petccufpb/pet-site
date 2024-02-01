import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const params = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/attendance", {
    method: "POST",
    body: JSON.stringify({ ...params }),
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
