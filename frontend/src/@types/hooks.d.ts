import "@hyoretsu/react-hooks";
import {
  Member as DefaultMember,
  Project,
  ProjectAttendance,
  ProjectCertificate,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "backend";

type APIError = {
  statusCode: number;
  message: string | string[];
  error: string;
};

type Member = DefaultMember & {
  type?: "decano";
};

type Tutor = DefaultMember & {
  type: "tutor" | "founder";
};

declare module "@hyoretsu/react-hooks" {
  interface APIMapping {
    "/projects": Project | APIError;
    "/projects/certificates": ProjectCertificate[] | APIError;
    "/projects/certificates/create": ProjectCertificate | APIError;
    "/projects/certificates/validate": boolean | APIError;
    "/projects/editions": ProjectEdition | ProjectEdition[] | APIError;
    "/projects/editions/latest": ProjectEdition | APIError;
    "/projects/events": ProjectEvent | APIError;
    "/projects/participants": ProjectParticipant | APIError;
    "/projects/participations": ProjectParticipation | APIError;
    "/projects/speakers": ProjectSpeaker | APIError;
    "/team/members": Member | Member[] | APIError;
    "/team/tutors": Tutor[] | APIError;
  }
}
