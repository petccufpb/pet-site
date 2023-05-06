import {
  Project,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

import { CreateEditionDTO } from "../dtos/CreateEdition.dto";
import { CreateEventDTO } from "../dtos/CreateEvent.dto";
import { CreateParticipantDTO } from "../dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "../dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "../dtos/CreateProject.dto";
import { CreateSpeakerDTO } from "../dtos/CreateSpeaker.dto";

export interface CreateRepoParticipation extends Omit<CreateParticipationDTO, "email" | "matricula"> {
  participantId: string;
}

export interface FindExistingEventDTO {
  editionId: string;
  location?: string;
  startTime: Date;
}

export abstract class ProjectsRepository {
  abstract create(data: CreateProjectDTO): Promise<Project>;
  abstract createEdition(data: CreateEditionDTO): Promise<ProjectEdition>;
  abstract createEvent(data: CreateEventDTO): Promise<ProjectEvent>;
  abstract createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant>;
  abstract createParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation>;
  abstract createSpeaker(data: CreateSpeakerDTO): Promise<ProjectSpeaker>;
  abstract findByTitle(title: string): Promise<Project | null>;
  abstract findEditionById(id: string): Promise<ProjectEdition | null>;
  abstract findExistingEvent(data: FindExistingEventDTO): Promise<ProjectEvent | null>;
  abstract findParticipantByEmail(email: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null>;
  abstract findParticipantByPhone(phone: string): Promise<ProjectParticipant | null>;
  abstract findSameParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation | null>;
  abstract findSpeakerById(id: string): Promise<ProjectSpeaker | null>;
  abstract findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null>;
}
