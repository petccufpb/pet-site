import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const params = await request.json();

  const d = {
    age: params.age,
    course: params.course,
    email: params.email,
    matricula: params.matricula,
    name: params.name,
    phoneNumber: params.celular,
    university: "undefined",
  };

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participants", {
    method: "POST",
    body: JSON.stringify(d),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
