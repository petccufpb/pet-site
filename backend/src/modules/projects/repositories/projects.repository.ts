import {
  Prisma,
  Project,
  ProjectAttendance,
  ProjectCertificate,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

import CreateAttendanceDTO from "../dtos/CreateAttendance.dto";
import CreateEditionDTO from "../dtos/CreateEdition.dto";
import CreateEventDTO from "../dtos/CreateEvent.dto";
import CreateParticipantDTO from "../dtos/CreateParticipant.dto";
import CreateParticipationDTO from "../dtos/CreateParticipation.dto";
import CreateProjectDTO from "../dtos/CreateProject.dto";
import CreateSpeakerDTO from "../dtos/CreateSpeaker.dto";
import FindExistingParticipantDTO from "../dtos/FindExistingParticipant.dto";
import UpdateParticipantDTO from "../dtos/UpdateParticipant.dto";

export interface CertificateInfo {
  attendance?: number;
  editionId?: string;
  eventId?: string;
  participantId: string;
}

export interface CreateRepoAttendance extends Omit<CreateAttendanceDTO, "email" | "matricula"> {
  participantId: string;
}

export interface CreateRepoParticipation extends Omit<CreateParticipationDTO, "email" | "matricula"> {
  participantId: string;
}

export interface FindEditionDTO {
  number: number;
  projectId: string;
}

export interface FindExistingEventDTO {
  editionId: string;
  location?: string;
  startTime: Date;
}

export type FindParticipationDTO =
  | {
      editionId: string;
      participantId: string;
    }
  | {
      eventId: string;
      participantId: string;
    };

export type CompleteProjectAttendance = Prisma.ProjectAttendanceGetPayload<{
  include: {
    event: true;
    participant: true;
  };
}>;

export type CompleteProjectCertificate = Prisma.ProjectCertificateGetPayload<{
  include: {
    edition: {
      include: {
        certificateTemplate: true;
      };
    };
    event: {
      include: {
        certificateTemplate: true;
      };
    };
    participant: true;
  };
}>;

export type CompleteProjectEdition = ProjectEdition & {
  events: (CompleteProjectEvent & { attendees: ProjectAttendance[] })[];
};

export type CompleteProjectEvent = Prisma.ProjectEventGetPayload<{
  include: {
    edition: true;
    participants: true;
    speaker: true;
  };
}>;

export default abstract class ProjectsRepository {
  abstract createAttendance(data: CreateRepoAttendance): Promise<ProjectAttendance>;
  abstract createCertificate(data: CertificateInfo): Promise<ProjectCertificate>;
  abstract createCertificates(data: CertificateInfo[]): Promise<void>;
  abstract createEdition(data: CreateEditionDTO): Promise<ProjectEdition>;
  abstract createEvent(data: CreateEventDTO): Promise<ProjectEvent>;
  abstract createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant>;
  abstract createParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation>;
  abstract createProject(data: CreateProjectDTO): Promise<Project>;
  abstract createSpeaker(data: CreateSpeakerDTO): Promise<ProjectSpeaker>;
  abstract deleteParticipation(participantId: string, eventId: string): Promise<void>;
  abstract findAllEditions(projectId: string): Promise<CompleteProjectEdition[]>;
  abstract findAllEvents(): Promise<ProjectEvent[]>;
  abstract findAttendance(data: CreateRepoAttendance): Promise<CompleteProjectAttendance | null>;
  abstract findAttendancesByEvent(eventId: string): Promise<CompleteProjectAttendance[]>;
  abstract findCertificateById(id: string): Promise<ProjectCertificate | null>;
  abstract findCertificatesByEditionId(editionId: string): Promise<CompleteProjectCertificate[]>;
  abstract findCertificatesByEventId(eventId: string): Promise<CompleteProjectCertificate[]>;
  abstract findCertificatesByParticipantId(eventId: string): Promise<CompleteProjectCertificate[]>;
  abstract findEditionById(id: string): Promise<CompleteProjectEdition | null>;
  abstract findEditionByNumber(where: FindEditionDTO): Promise<ProjectEdition | null>;
  abstract findEventById(id: string): Promise<CompleteProjectEvent | null>;
  abstract findEventParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]>;
  abstract findEventsByEdition(editionId: string): Promise<ProjectEvent[]>;
  abstract findExistingEvent(data: FindExistingEventDTO): Promise<ProjectEvent | null>;
  abstract findExistingParticipant(data: FindExistingParticipantDTO): Promise<ProjectParticipant | null>;
  abstract findParticipantByEmail(email: string): Promise<ProjectParticipant | null>;
  abstract findParticipantById(id: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByMatricula(matricula: string | null): Promise<ProjectParticipant | null>;
  abstract findParticipantByPhone(phone: string): Promise<ProjectParticipant | null>;
  abstract findParticipants(ids: (string | null)[]): Promise<ProjectParticipant[]>;
  abstract findParticipantsByEdition(editionId: string): Promise<ProjectParticipant[]>;
  abstract findParticipantsByEvent(eventId: string): Promise<ProjectParticipant[]>;
  abstract findParticipation(data: FindParticipationDTO): Promise<ProjectParticipation | null>;
  abstract findParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]>;
  abstract findParticipationsByEvent(eventId: string): Promise<ProjectParticipation[]>;
  abstract findProjectById(id: string): Promise<Project | null>;
  abstract findProjectByTitle(title: string): Promise<Project | null>;
  abstract findSpeakerById(id: string): Promise<ProjectSpeaker | null>;
  abstract updateParticipant(id: string, data: UpdateParticipantDTO): Promise<ProjectParticipant>;
}
