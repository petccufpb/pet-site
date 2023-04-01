import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import { prisma } from "@services/prisma";

export async function GET() {
  const tutors = await prisma.member.findMany({
    where: {
      type: {
        in: ["founder", "tutor"],
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(tutors);
}
