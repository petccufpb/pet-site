import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const params = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participations", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      eventId: params.event,
      editionId: params.edition,
    }),
    headers: {
      "Content-Type": "application/json",
      Origin: req.headers.get("Origin")!,
    },
  });

  const data = await res.json();

  console.log(res.status, data);

  if (res.status === 201) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
