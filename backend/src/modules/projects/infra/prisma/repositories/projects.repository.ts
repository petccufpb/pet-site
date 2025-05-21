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
import FindExistingParticipantDTO from "@modules/projects/dtos/FindExistingParticipant.dto";
import UpdateParticipantDTO from "@modules/projects/dtos/UpdateParticipant.dto";
import ProjectsRepository, {
	CertificateInfo,
	CompleteProjectAttendance,
	CompleteProjectCertificate,
	CompleteProjectEdition,
	CompleteProjectEvent,
	CreateRepoAttendance,
	CreateRepoParticipation,
	FindEditionDTO,
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
    const participant = await this.prisma.projectParticipant.create({
      data,
    });

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

  public async deleteParticipation(participantId: string, eventId: string): Promise<void> {
    await this.prisma.projectParticipation.delete({
      where: {
        participantId_eventId: {
          participantId,
          eventId,
        },
      },
    });
  }

  public async findAllEditions(projectId: string): Promise<CompleteProjectEdition[]> {
    const editions = await this.prisma.projectEdition.findMany({
      where: { projectId },
      include: {
        certificateTemplate: true,
        events: {
          include: {
            attendees: true,
            participants: true,
            speaker: true,
          },
        },
        participants: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return editions;
  }

  public async findAllEvents(): Promise<ProjectEvent[]> {
    const events = await this.prisma.projectEvent.findMany();

    return events;
  }

  public async findAttendance(where: CreateRepoAttendance): Promise<CompleteProjectAttendance | null> {
    const attendance = await this.prisma.projectAttendance.findFirst({
      where,
      include: {
        event: true,
        participant: true,
      },
    });

    return attendance;
  }

  public async findAttendancesByEvent(eventId: string): Promise<CompleteProjectAttendance[]> {
    const attendances = await this.prisma.projectAttendance.findMany({
      where: { eventId },
      include: {
        event: true,
        participant: true,
      },
    });

    return attendances;
  }

  public async findCertificateById(id: string): Promise<ProjectCertificate | null> {
    const certificate = await this.prisma.projectCertificate.findFirst({
      where: { id },
    });

    return certificate;
  }

  public async findCertificatesByEditionId(editionId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = await this.prisma.projectCertificate.findMany({
      where: {
        editionId,
        eventId: null,
      },
      include: {
        edition: {
          include: {
            certificateTemplate: {
              where: {
                kind: null,
              },
            },
          },
        },
        participant: true,
        event: {
          include: { certificateTemplate: true },
        },
      },
    });

    return certificates;
  }

  public async findCertificatesByEventId(eventId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = await this.prisma.projectCertificate.findMany({
      where: { eventId },
      include: {
        participant: true,
        speaker: true,
        event: {
          include: {
            certificateTemplate: true,
            edition: {
              include: { certificateTemplate: true },
            },
          },
        },
      },
    });

    return certificates.map(each => ({
      ...each,
      edition: each.event!.edition,
    }));
  }

  public async findCertificatesByParticipantId(participantId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = await this.prisma.projectCertificate.findMany({
      where: { participantId },
      include: {
        edition: {
          include: { certificateTemplate: true },
        },
        participant: true,
        event: {
          include: { certificateTemplate: true },
        },
      },
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
            attendees: true,
            participants: true,
            speaker: true,
          },
        },
      },
    });

    return edition;
  }

  public async findEditionByNumber(where: FindEditionDTO): Promise<ProjectEdition | null> {
    const edition = await this.prisma.projectEdition.findFirst({
      where,
    });

    return edition;
  }

  public async findEventById(id: string): Promise<CompleteProjectEvent | null> {
    const event = await this.prisma.projectEvent.findFirst({
      where: { id },
      include: {
        participants: true,
        speaker: true,
      },
    });

    return event;
  }

  public async findEventParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]> {
    const completeEdition = await this.prisma.projectEdition.findFirst({
      where: { id: editionId },
      include: {
        events: {
          include: {
            participants: true,
          },
        },
      },
    });

    const participations: ProjectParticipation[] = [];
    completeEdition?.events.forEach(event => {
      event.participants.forEach(participation => {
        participations.push(participation);
      });
    });

    return participations;
  }

  public async findEventsByEdition(editionId: string): Promise<ProjectEvent[]> {
    const events = await this.prisma.projectEvent.findMany({
      where: { editionId },
      orderBy: {
        startTime: "asc",
      },
    });

    return events;
  }

  public async findExistingEvent(where: FindExistingEventDTO): Promise<ProjectEvent | null> {
    const event = await this.prisma.projectEvent.findFirst({
      where,
    });

    return event;
  }

  public async findExistingParticipant({
    email,
    matricula,
    phoneNumber,
  }: FindExistingParticipantDTO): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: {
        OR: [{ email }, { matricula }, { phoneNumber }],
      },
    });

    return participant;
  }

  public async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: { email },
    });

    return participant;
  }

  public async findParticipantById(id: string): Promise<ProjectParticipant | null> {
    const participant = await this.prisma.projectParticipant.findFirst({
      where: { id },
    });

    return participant;
  }

  public async findParticipantByMatricula(matricula: string): Promise<ProjectParticipant | null> {
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

  public async findParticipants(ids: string[]): Promise<ProjectParticipant[]> {
    const participants = await this.prisma.projectParticipant.findMany({
      where: {
        id: { in: ids },
      },
    });

    return participants;
  }

  public async findParticipantsByEdition(editionId: string): Promise<ProjectParticipant[]> {
    const participations = await this.prisma.projectParticipation.findMany({
      where: { editionId },
      include: {
        participant: true,
      },
    });

    return participations.map(participation => participation.participant);
  }

  public async findParticipantsByEvent(eventId: string): Promise<ProjectParticipant[]> {
    const participations = await this.prisma.projectParticipation.findMany({
      where: { eventId },
      include: {
        participant: true,
      },
    });

    return participations.map(participation => participation.participant);
  }

  public async findParticipation({
    editionId,
    eventId,
    participantId,
  }: CreateRepoParticipation): Promise<ProjectParticipation | null> {
    const participation = await this.prisma.projectParticipation.findUnique({
      // @ts-ignore
      where: {
        ...(editionId && { participantId_editionId: { editionId, participantId } }),
        ...(eventId && { participantId_eventId: { eventId, participantId } }),
      },
    });

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

  public async findSpeakerById(id: string): Promise<ProjectSpeaker | null> {
    const speaker = await this.prisma.projectSpeaker.findFirst({
      where: { id },
    });

    return speaker;
  }

  public async updateParticipant(
    id: string,
    { course, email, phoneNumber }: UpdateParticipantDTO,
  ): Promise<ProjectParticipant> {
    const participant = await this.prisma.projectParticipant.update({
      data: {
        ...(course && { course }),
        ...(email && { email }),
        ...(phoneNumber && { phoneNumber }),
      },
      where: {
        id,
      },
    });

    return participant;
  }
}
