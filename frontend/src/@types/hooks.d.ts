import "@hyoretsu/react-hooks";
import { Member as DefaultMember } from "backend";

type APIError = {
  statusCode: number;
  message: string;
};

type Member = Default & {
  type?: "decano";
};

type Tutor = DefaultMember & {
  type: "tutor" | "founder";
};

declare module "@hyoretsu/react-hooks" {
  interface APIMapping {
    "/team/members": Member | Member[] | APIError;
    "/team/tutors": Tutor[];
  }
}
