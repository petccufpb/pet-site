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
import { randomUUID } from "crypto";
import { isBefore, isSameHour, isSameMinute } from "date-fns";

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
  FindEditionDTO,
  FindExistingEventDTO,
} from "../projects.repository";

@Injectable()
export default class FakeProjectsRepository implements ProjectsRepository {
  private attendances: ProjectAttendance[] = [];
  private certificates: ProjectCertificate[] = [];
  private editions: ProjectEdition[] = [];
  private events: ProjectEvent[] = [];
  private participants: ProjectParticipant[] = [];
  private participations: ProjectParticipation[] = [];
  private projects: Project[] = [];
  private speakers: ProjectSpeaker[] = [];

  public async createAttendance({ ...data }: CreateRepoAttendance): Promise<ProjectAttendance> {
    const attendance = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.attendances.push(attendance);

    return attendance;
  }

  public async createCertificate({ eventId, ...data }: CertificateInfo): Promise<ProjectCertificate> {
    const certificate = {
      ...data,
      eventId: eventId || null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.certificates.push(certificate);

    return certificate;
  }

  public async createCertificates(data: CertificateInfo[]): Promise<void> {
    data.forEach(({ eventId, ...info }) => {
      const certificate = {
        ...info,
        eventId: eventId || null,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.certificates.push(certificate);
    });
  }

  public async createEdition({ name, number, ...data }: CreateEditionDTO): Promise<ProjectEdition> {
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

  public async createEvent({ capacity, location, onSite, ...data }: CreateEventDTO): Promise<ProjectEvent> {
    const event = {
      ...data,
      capacity: capacity || null,
      location: location || null,
      onSite: onSite || true,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.events.push(event);

    return event;
  }

  public async createParticipant(data: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.participants.push(participant);

    return participant;
  }

  public async createParticipation({
    editionId,
    eventId,
    ...data
  }: CreateRepoParticipation): Promise<ProjectParticipation> {
    const participation = {
      ...data,
      editionId: editionId || null,
      eventId: eventId || null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.participations.push(participation);

    return participation;
  }

  public async createProject({ about, logoUrl, ...data }: CreateProjectDTO): Promise<Project> {
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

  public async createSpeaker(data: CreateSpeakerDTO): Promise<ProjectSpeaker> {
    const speaker = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.speakers.push(speaker);

    return speaker;
  }

  public async findAllEditions(projectId: string): Promise<CompleteProjectEdition[]> {
    const editions = this.editions.filter(
      edition => edition.projectId === projectId,
    ) as CompleteProjectEdition[];

    editions.forEach(edition => {
      edition.events = this.events
        .filter(event => event.editionId === edition.id)
        .map(event => ({
          ...event,
          speaker: this.speakers.find(speaker => speaker.id === event.speakerId) as ProjectSpeaker,
        }));
    });

    editions.sort((a, b) => Number(isBefore(a.date, b.date)) * 2 - 1);

    return editions;
  }

  public async findAttendance({
    eventId,
    participantId,
  }: CreateRepoAttendance): Promise<ProjectAttendance | null> {
    const attendance =
      this.attendances.find(
        attendance => attendance.participantId === participantId && attendance.eventId === eventId,
      ) || null;

    return attendance;
  }

  public async findCertificateById(id: string): Promise<ProjectCertificate | null> {
    const certificate = (await this.certificates.find(certificate => certificate.id === id)) || null;

    return certificate;
  }

  public async findCertificatesByEditionId(editionId: string): Promise<ProjectCertificate[]> {
    const certificates = this.certificates.filter(
      certificate => certificate.editionId === editionId && certificate.eventId === null,
    );

    return certificates;
  }

  public async findCertificatesByEventId(eventId: string): Promise<ProjectCertificate[]> {
    const certificates = this.certificates.filter(certificate => certificate.eventId === eventId);

    return certificates;
  }

  public async findEditionById(id: string): Promise<CompleteProjectEdition | null> {
    const edition = (this.editions.find(edition => edition.id === id) as CompleteProjectEdition) || null;

    if (edition) {
      // @ts-ignore
      edition.events = this.events
        .filter(event => event.editionId === id)
        .map(event => ({
          ...event,
          speaker: this.speakers.find(speaker => speaker.id === event.speakerId) as ProjectSpeaker,
        }));
    }

    return edition;
  }

  public async findEditionByNumber({ number, projectId }: FindEditionDTO): Promise<ProjectEdition | null> {
    const edition =
      this.editions.find(edition => edition.projectId === projectId && edition.number === number) || null;

    return edition;
  }

  public async findEventById(id: string): Promise<CompleteProjectEvent | null> {
    const event = (this.events.find(event => event.id === id) as CompleteProjectEvent) || null;

    if (event) {
      event.speaker = this.speakers.find(speaker => speaker.id === event.speakerId) as ProjectSpeaker;
    }

    return event;
  }

  public async findExistingEvent({
    editionId,
    location,
    startTime,
  }: FindExistingEventDTO): Promise<ProjectEvent | null> {
    const event =
      this.events.find(
        event =>
          event.editionId === editionId &&
          event.location === location &&
          isSameHour(event.startTime, startTime) &&
          isSameMinute(event.startTime, startTime),
      ) || null;

    return event;
  }

  public async findParticipantByEmail(email: string): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(participant => participant.email === email) || null;

    return participant;
  }

  public async findParticipantById(id: string): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(participant => participant.id === id) || null;

    return participant;
  }

  public async findParticipantByMatricula(matricula: string): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(participant => participant.matricula === matricula) || null;

    return participant;
  }

  public async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant =
      this.participants.find(participant => participant.phoneNumber === phoneNumber) || null;

    return participant;
  }

  public async findParticipation({
    editionId,
    eventId,
    participantId,
  }: CreateRepoParticipation): Promise<ProjectParticipation | null> {
    const participation =
      this.participations.find(
        participation =>
          participation.participantId === participantId &&
          (participation.editionId === editionId || participation.eventId === eventId),
      ) || null;

    return participation;
  }

  public async findParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]> {
    const participations = this.participations.filter(participation => participation.editionId === editionId);

    return participations;
  }

  public async findParticipationsByEvent(eventId: string): Promise<ProjectParticipation[]> {
    const participations = this.participations.filter(participation => participation.eventId === eventId);

    return participations;
  }

  public async findProjectById(id: string): Promise<Project | null> {
    const project = this.projects.find(project => project.id === id) || null;

    return project;
  }

  public async findProjectByTitle(title: string): Promise<Project | null> {
    const project = this.projects.find(project => project.title === title) || null;

    return project;
  }

  public async findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null> {
    const speaker = this.speakers.find(speaker => speaker.email === email) || null;

    return speaker;
  }

  public async findSpeakerById(id: string): Promise<ProjectSpeaker | null> {
    const speaker = this.speakers.find(speaker => speaker.id === id) || null;

    return speaker;
  }
}
