import {
  Project,
  ProjectAttendance,
  ProjectCertificate,
  ProjectCertificateTemplate,
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

export interface CertificateInfo {
  editionId: string;
  eventId?: string;
  participantId: string;
}

export interface CreateRepoAttendance extends Omit<CreateAttendanceDTO, "email" | "matricula"> {
  participantId: string;
}

export interface CreateRepoParticipation extends Omit<CreateParticipationDTO, "email" | "matricula"> {
  participantId: string;
}

export interface FindExistingEventDTO {
  editionId: string;
  location?: string;
  startTime: Date;
}

export type CompleteProjectEvent = ProjectEvent & {
  speaker: ProjectSpeaker;
};

export type CompleteProjectEdition = ProjectEdition & {
  certificateTemplate: ProjectCertificateTemplate | null;
  events: CompleteProjectEvent[];
};

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
  abstract findAllEditions(projectId: string): Promise<CompleteProjectEdition[]>;
  abstract findAttendance(data: CreateRepoAttendance): Promise<ProjectAttendance | null>;
  abstract findCertificateById(id: string): Promise<ProjectCertificate | null>;
  abstract findCertificatesByEditionId(editionId: string): Promise<ProjectCertificate[]>;
  abstract findCertificatesByEventId(eventId: string): Promise<ProjectCertificate[]>;
  abstract findEditionById(id: string): Promise<CompleteProjectEdition | null>;
  abstract findEventById(id: string): Promise<CompleteProjectEvent | null>;
  abstract findExistingEvent(data: FindExistingEventDTO): Promise<ProjectEvent | null>;
  abstract findParticipantByEmail(email: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByMatricula(matricula: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByPhone(phone: string): Promise<ProjectParticipant | null>;
  abstract findParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation | null>;
  abstract findParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]>;
  abstract findParticipationsByEvent(eventId: string): Promise<ProjectParticipation[]>;
  abstract findProjectById(id: string): Promise<Project | null>;
  abstract findProjectByTitle(title: string): Promise<Project | null>;
  abstract findSpeakerById(id: string): Promise<ProjectSpeaker | null>;
  abstract findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null>;
}
