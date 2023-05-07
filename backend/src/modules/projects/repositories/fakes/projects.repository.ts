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
import { randomUUID } from "crypto";
import { isSameHour, isSameMinute } from "date-fns";

import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateEventDTO } from "@modules/projects/dtos/CreateEvent.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { CreateSpeakerDTO } from "@modules/projects/dtos/CreateSpeaker.dto";

import {
  CreateRepoAttendance,
  CreateRepoParticipation,
  FindExistingEventDTO,
  ProjectsRepository,
} from "../projects.repository";

@Injectable()
export class FakeProjectsRepository implements ProjectsRepository {
  private attendances: ProjectAttendance[] = [];
  private editions: ProjectEdition[] = [];
  private events: ProjectEvent[] = [];
  private participants: ProjectParticipant[] = [];
  private participations: ProjectParticipation[] = [];
  private projects: Project[] = [];
  private speakers: ProjectSpeaker[] = [];

  public async create({ about, logoUrl, ...data }: CreateProjectDTO): Promise<Project> {
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

  public async findByTitle(title: string): Promise<Project | null> {
    const project = this.projects.find(project => project.title === title) || null;

    return project;
  }

  public async findEditionById(id: string): Promise<ProjectEdition | null> {
    const edition = this.editions.find(edition => edition.id === id) || null;

    return edition;
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

  public async findParticipantByMatricula(matricula: number): Promise<ProjectParticipant | null> {
    const participant = this.participants.find(participant => participant.matricula === matricula) || null;

    return participant;
  }

  public async findParticipantByPhone(phoneNumber: string): Promise<ProjectParticipant | null> {
    const participant =
      this.participants.find(participant => participant.phoneNumber === phoneNumber) || null;

    return participant;
  }

  public async findSpeakerByEmail(email: string): Promise<ProjectSpeaker | null> {
    const speaker = this.speakers.find(speaker => speaker.email === email) || null;

    return speaker;
  }

  public async findSpeakerById(id: string): Promise<ProjectSpeaker | null> {
    const speaker = this.speakers.find(speaker => speaker.id === id) || null;

    return speaker;
  }

  public async findSameAttendance({
    eventId,
    participantId,
  }: CreateRepoAttendance): Promise<ProjectAttendance | null> {
    const attendance =
      this.attendances.find(
        attendance => attendance.participantId === participantId && attendance.eventId === eventId,
      ) || null;

    return attendance;
  }

  public async findSameParticipation({
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
}
