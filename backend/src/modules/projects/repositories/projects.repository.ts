import { Project, ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";

import { CreateEditionDTO } from "../dtos/CreateEdition.dto";
import { CreateParticipantDTO } from "../dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "../dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "../dtos/CreateProject.dto";

export abstract class ProjectsRepository {
  abstract create(data: CreateProjectDTO): Promise<Project>;
  abstract createEdition(data: CreateEditionDTO): Promise<ProjectEdition>;
  abstract createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant>;
  abstract createParticipation(data: CreateParticipationDTO): Promise<ProjectParticipation>;
  abstract findByTitle(title: string): Promise<Project | null>;
  abstract findParticipantByEmail(email: string): Promise<ProjectParticipant | null>;
  abstract findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null>;
  abstract findParticipantByPhone(phone: string): Promise<ProjectParticipant | null>;
  abstract findSameParticipation(data: CreateParticipationDTO): Promise<ProjectParticipation | null>;
}
