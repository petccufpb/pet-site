import { Injectable } from "@nestjs/common";
import {
  Project,
  ProjectAttendance,
  ProjectCertificate,
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
  CertificateInfo,
  CompleteProjectEdition,
  CompleteProjectEvent,
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

  public async createCertificate(data: CertificateInfo): Promise<ProjectCertificate> {
    const certificate = await this.prisma.projectCertificate.create({ data });

    return certificate;
  }

  public async createCertificates(data: CertificateInfo[]): Promise<void> {
    await this.prisma.projectCertificate.createMany({ data });
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

  public async findAllEditions(projectId: string): Promise<CompleteProjectEdition[]> {
    const editions = await this.prisma.projectEdition.findMany({
      where: { projectId },
      include: {
        certificateTemplate: true,
        events: {
          include: {
            speaker: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return editions;
  }

  public async findAttendance(where: CreateRepoParticipation): Promise<ProjectAttendance | null> {
    const attendance = await this.prisma.projectAttendance.findFirst({ where });

    return attendance;
  }

  public async findCertificateById(id: string): Promise<ProjectCertificate | null> {
    const certificate = await this.prisma.projectCertificate.findFirst({
      where: { id },
    });

    return certificate;
  }

  public async findCertificatesByEditionId(editionId: string): Promise<ProjectCertificate[]> {
    const certificates = await this.prisma.projectCertificate.findMany({
      where: {
        editionId,
        eventId: null,
      },
    });

    return certificates;
  }

  public async findCertificatesByEventId(eventId: string): Promise<ProjectCertificate[]> {
    const certificates = await this.prisma.projectCertificate.findMany({
      where: { eventId },
    });

    return certificates;
  }

  public async findEditionById(id: string): Promise<CompleteProjectEdition | null> {
    const edition = await this.prisma.projectEdition.findFirst({
      where: { id },
      include: {
        certificateTemplate: true,
        events: {
          include: {
            speaker: true,
          },
        },
      },
    });

    return edition;
  }

  public async findEventById(id: string): Promise<CompleteProjectEvent | null> {
    const event = await this.prisma.projectEvent.findFirst({
      where: { id },
      include: {
        speaker: true,
      },
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

  public async findParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]> {
    const participants = await this.prisma.projectParticipation.findMany({
      where: { editionId },
    });

    return participants;
  }

  public async findParticipationsByEvent(eventId: string): Promise<ProjectParticipation[]> {
    const participants = await this.prisma.projectParticipation.findMany({
      where: { eventId },
    });

    return participants;
  }

  public async findProjectById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { id },
    });

    return project;
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
