export {
  MemberContact,
  Project,
  ProjectAttendance,
  ProjectCertificateTemplate,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

export { CompleteMember as Member } from "../src/modules/members/repositories/MembersRepository";
export {
  CompleteProjectCertificate as ProjectCertificate,
  CompleteProjectEdition as ProjectEdition,
  CompleteProjectEvent as ProjectEvent,
} from "../src/modules/projects/repositories/projects.repository";
