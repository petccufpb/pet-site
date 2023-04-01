import { MemberContact, Prisma } from "@prisma/client";

declare module "@prisma/client" {
  type Member = Prisma.MemberGetPayload<{
    include: {
      contactInfo: true;
    };
  }> & {
    type: "decano" | "founder" | "tutor";
  };
}
