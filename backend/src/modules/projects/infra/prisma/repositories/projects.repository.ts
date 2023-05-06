import { Injectable } from "@nestjs/common";
import { Project, ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "@modules/projects/dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { ProjectsRepository } from "@modules/projects/repositories/projects.repository";

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

  async createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = await this.prisma.projectParticipant.create({ data });

    return participant;
  }

  async createParticipation(data: CreateParticipationDTO): Promise<ProjectParticipation> {
    const participation = await this.prisma.projectParticipation.create({ data });

    return participation;
  }

  public async findByTitle(title: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { title },
    });

    return project;
  }

  async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { email },
    });

    return participant;
  }

  async findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { matricula },
    });

    return participant;
  }

  async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant = this.prisma.projectParticipant.findFirst({
      where: { phoneNumber },
    });

    return participant;
  }

  async findSameParticipation(where: CreateParticipationDTO): Promise<ProjectParticipation | null> {
    const participation = this.prisma.projectParticipation.findFirst({ where });

    return participation;
  }
}
