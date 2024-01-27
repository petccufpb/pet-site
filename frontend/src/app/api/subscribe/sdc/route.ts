import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const params = await request.json();

  const splitDate = params.birthDate.split("/");
  const dt = new Date(parseInt(splitDate[2], 10), parseInt(splitDate[1], 10) - 1, parseInt(splitDate[0], 10));

  const d = {
    birthDate: dt,
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
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participations", {
      method: "POST",
      body: JSON.stringify({
        editionId: params.editionId,
        participantId: data.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 500 });
  }
}
