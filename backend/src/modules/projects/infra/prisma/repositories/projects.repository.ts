import { Injectable } from "@nestjs/common";
import {
  Project,
  ProjectAttendance,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import CreateEditionDTO from "@modules/projects/dtos/CreateEdition.dto";
import CreateEventDTO from "@modules/projects/dtos/CreateEvent.dto";
import CreateParticipantDTO from "@modules/projects/dtos/CreateParticipant.dto";
import CreateProjectDTO from "@modules/projects/dtos/CreateProject.dto";
import CreateSpeakerDTO from "@modules/projects/dtos/CreateSpeaker.dto";
import ProjectsRepository, {
  CreateRepoAttendance,
  CreateRepoParticipation,
  FindExistingEventDTO,
} from "@modules/projects/repositories/projects.repository";

@Injectable()
export default class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  public async createAttendance(data: CreateRepoAttendance): Promise<ProjectAttendance> {
    const attendance = await this.prisma.projectAttendance.create({ data });

    return attendance;
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

  public async createParticipation(data: CreateRepoParticipation): Promise<ProjectParticipation> {
    const participation = await this.prisma.projectParticipation.create({ data });

    return participation;
  }

  public async createProject(data: CreateProjectDTO): Promise<Project> {
    const project = await this.prisma.project.create({ data });

    return project;
  }

  public async createSpeaker(data: CreateSpeakerDTO): Promise<ProjectSpeaker> {
    const speaker = await this.prisma.projectSpeaker.create({ data });

    return speaker;
  }

  public async findAttendance(where: CreateRepoParticipation): Promise<ProjectAttendance | null> {
    const attendance = await this.prisma.projectAttendance.findFirst({ where });

    return attendance;
  }

  public async findEditionById(id: string): Promise<ProjectEdition | null> {
    const edition = await this.prisma.projectEdition.findFirst({
      where: { id },
    });

    return edition;
  }

  public async findEventById(id: string): Promise<ProjectEvent | null> {
    const event = await this.prisma.projectEvent.findFirst({
      where: { id },
    });

    return event;
  }

  public async findExistingEvent(where: FindExistingEventDTO): Promise<ProjectEvent | null> {
    const event = await this.prisma.projectEvent.findFirst({
      where,
    });

    return event;
  }

  public async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: { email },
    });

    return participant;
  }

  public async findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: { matricula },
    });

    return participant;
  }

  public async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: { phoneNumber },
    });

    return participant;
  }

  public async findParticipation(where: CreateRepoParticipation): Promise<ProjectParticipation | null> {
    const participation = await this.prisma.projectParticipation.findFirst({ where });

    return participation;
  }

  public async findProjectByTitle(title: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { title },
    });

    return project;
  }

  public async findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null> {
    const speaker = await this.prisma.projectSpeaker.findFirst({
      where: { email },
    });

    return speaker;
  }

  public async findSpeakerById(id: string): Promise<ProjectSpeaker | null> {
    const speaker = await this.prisma.projectSpeaker.findFirst({
      where: { id },
    });

    return speaker;
  }
}
