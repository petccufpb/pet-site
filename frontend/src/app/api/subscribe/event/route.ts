import { NextResponse } from "next/server";
import { SDCScheduleData } from "sdc";

export async function POST(request: Request) {
  const params = await request.json();
  const find = await (
    await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participants/find", {
      method: "POST",
      body: JSON.stringify({
        email: params.email,
      }),
    })
  ).json();

  if (find === null) {
    const sdcData: SDCScheduleData = await (
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/editions/latest?project=SDC")
    ).json();

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participations", {
      method: "POST",
      body: JSON.stringify({
        email: params.email,
        editionId: sdcData.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.status, await res.json());
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/projects/participations", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      eventId: params.event,
      editionId: params.edition,
    }),
    headers: {
      "Content-Type": "application/json",
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
