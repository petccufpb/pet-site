import {
  Project,
  ProjectAttendance,
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

export default abstract class ProjectsRepository {
  abstract createAttendance(data: CreateRepoAttendance): Promise<ProjectAttendance>;
  abstract createEdition(data: CreateEditionDTO): Promise<ProjectEdition>;
  abstract createEvent(data: CreateEventDTO): Promise<ProjectEvent>;
  abstract createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant>;
  abstract createParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation>;
  abstract createProject(data: CreateProjectDTO): Promise<Project>;
  abstract createSpeaker(data: CreateSpeakerDTO): Promise<ProjectSpeaker>;
  abstract findAttendance(data: CreateRepoAttendance): Promise<ProjectAttendance | null>;
  abstract findEditionById(id: string): Promise<ProjectEdition | null>;
  abstract findEventById(id: string): Promise<ProjectEvent | null>;
  abstract findExistingEvent(data: FindExistingEventDTO): Promise<ProjectEvent | null>;
  abstract findParticipantByEmail(email: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null>;
  abstract findParticipantByPhone(phone: string): Promise<ProjectParticipant | null>;
  abstract findParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation | null>;
  abstract findProjectByTitle(title: string): Promise<Project | null>;
  abstract findSpeakerById(id: string): Promise<ProjectSpeaker | null>;
  abstract findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null>;
}
