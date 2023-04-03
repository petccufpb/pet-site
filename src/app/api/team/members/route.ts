import { NextResponse } from "next/server";
import * as yup from "yup";

import { prisma } from "@services/prisma";

export async function GET() {
  const members = await prisma.member.findMany({
    where: {
      type: {
        notIn: ["founder", "tutor"],
      },
    },
    orderBy: { name: "asc" },
    include: {
      contactInfo: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const schema = yup.object({
    name: yup.string().required(),
    about: yup.string(),
    photoUrl: yup.string(),
    type: yup.string().oneOf(["", "decano", "founder", "tutor"]),
    isActive: yup.boolean(),
    contactInfo: yup.array().of(
      yup.object({
        name: yup.string().required(),
        snsId: yup.string().required(),
      }),
    ),
  });

  const { contactInfo = [], ...body } = await schema.validate(await req.json());

  if (body.type === "decano") {
    const existingDecano = await prisma.member.findFirst({
      where: {
        type: "decano",
      },
    });

    if (existingDecano) {
      return new Response("There is already a decano", { status: 400 });
    }
  } else if (body.type === "founder") {
    const existingFounder = await prisma.member.findFirst({
      where: {
        type: "founder",
      },
    });

    if (existingFounder) {
      return new Response("There is already a founder", { status: 400 });
    }
  }

  const member = await prisma.member.create({
    data: {
      ...body,
      contactInfo: {
        createMany: {
          data: contactInfo,
        },
      },
    },
  });

  return NextResponse.json(member);
}
