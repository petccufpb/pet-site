import "@hyoretsu/react-hooks";
import { Member as DefaultMember } from "@prisma/client";

type Member = DefaultMember & {
  type?: "decano";
};

type Tutor = DefaultMember & {
  type: "tutor" | "founder";
};

declare module "@hyoretsu/react-hooks" {
  interface APIMapping {
    "/team/members": Member | Member[] | string;
    "/team/tutors": Tutor[];
  }
}
