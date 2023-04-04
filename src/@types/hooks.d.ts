import "@hyoretsu/react-hooks";
import { Member as DefaultMember } from "@prisma/client";

type Member = DefaultMember & {
  type?: "decano";
};

type Tutor = Member & {
  type: "tutor" | "founder";
};

declare module "@hyoretsu/react-hooks" {
  interface APIMapping {
    "/api/team/members": Member | Member[] | string;
    "/api/team/tutors": Tutor[];
  }
}
