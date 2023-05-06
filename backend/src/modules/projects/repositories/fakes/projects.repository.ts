import { Injectable } from "@nestjs/common";
import { Project, ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "@modules/projects/dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";

import { ProjectsRepository } from "../projects.repository";

@Injectable()
export class FakeProjectsRepository implements ProjectsRepository {
  private editions: ProjectEdition[] = [];
  private participants: ProjectParticipant[] = [];
  private participations: ProjectParticipation[] = [];
  private projects: Project[] = [];

  async create({ about, logoUrl, ...data }: CreateProjectDTO): Promise<Project> {
    const project = {
      ...data,
      about: about || "",
      logoUrl: logoUrl || "",
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.push(project);

    return project;
  }

  async createEdition({ name, number, ...data }: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = {
      ...data,
      name: name || "",
      number: number || 1,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.editions.push(edition);

    return edition;
  }

  async createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.participants.push(participant);

    return participant;
  }

  async createParticipation(data: CreateParticipationDTO): Promise<ProjectParticipation> {
    const participation = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.participations.push(participation);

    return participation;
  }

  async findByTitle(title: string): Promise<Project | null> {
    const project = this.projects.find(project => project.title === title) as Project | null;

    return project;
  }

  async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(
      participant => participant.email === email,
    ) as ProjectParticipant | null;

    return participant;
  }

  async findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(
      participant => participant.matricula === matricula,
    ) as ProjectParticipant | null;

    return participant;
  }

  async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(
      participant => participant.phoneNumber === phoneNumber,
    ) as ProjectParticipant | null;

    return participant;
  }

  async findSameParticipation({
    editionId,
    participantId,
  }: CreateParticipationDTO): Promise<ProjectParticipation | null> {
    const participation = this.participations.find(
      participation => participation.editionId === editionId && participation.participantId === participantId,
    ) as ProjectParticipation | null;

    return participation;
  }
}
