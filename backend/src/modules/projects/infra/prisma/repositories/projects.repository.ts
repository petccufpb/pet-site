import { Injectable } from "@nestjs/common";
import {
  Project,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
} from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateEventDTO } from "@modules/projects/dtos/CreateEvent.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "@modules/projects/dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { FindExistingEventDTO, ProjectsRepository } from "@modules/projects/repositories/projects.repository";

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateProjectDTO): Promise<Project> {
    const project = await this.prisma.project.create({ data });

    return project;
  }

  public async createEdition(data: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.prisma.projectEdition.create({ data });

    return edition;
  }

  public async createEvent(data: CreateEventDTO): Promise<ProjectEvent> {
    const event = await this.prisma.projectEvent.create({ data });

    return event;
  }

  public async createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = await this.prisma.projectParticipant.create({ data });

    return participant;
  }

  public async createParticipation(data: CreateParticipationDTO): Promise<ProjectParticipation> {
    const participation = await this.prisma.projectParticipation.create({ data });

    return participation;
  }

  public async findByTitle(title: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { title },
    });

    return project;
  }

  public async findEditionById(id: string): Promise<ProjectEdition | null> {
    const edition = await this.prisma.projectEdition.findFirst({
      where: { id },
    });

    return edition;
  }

  public async findExistingEvent(where: FindExistingEventDTO): Promise<ProjectEvent | null> {
    const project = await this.prisma.projectEvent.findFirst({
      where,
    });

    return project;
  }

  public async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { email },
    });

    return participant;
  }

  public async findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { matricula },
    });

    return participant;
  }

  public async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { phoneNumber },
    });

    return participant;
  }

  public async findSameParticipation(where: CreateParticipationDTO): Promise<ProjectParticipation | null> {
    const participation = this.prisma.projectParticipation.findFirst({ where });

    return participation;
  }
}
