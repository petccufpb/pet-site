import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const params = await request.json();

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/certificates/validate", {
    method: "POST",
    body: JSON.stringify({ ...params }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  console.log(res.status, data);

  if (res.status === 201) {
    return NextResponse.json(data);
  } else {
    return new Response(null, { status: 500 });
  }
}
