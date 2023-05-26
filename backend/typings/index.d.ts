export {
  MemberContact,
  Project,
  ProjectAttendance,
  ProjectCertificate,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

export { CompleteMember as Member } from "@modules/members/repositories/MembersRepository";
export {
  CompleteProjectEdition as ProjectEdition,
  CompleteProjectEvent as ProjectEvent,
} from "@modules/projects/repositories/projects.repository";
