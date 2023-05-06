import { Injectable } from "@nestjs/common";
import {
  Project,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
} from "@prisma/client";
import { randomUUID } from "crypto";
import { isSameHour, isSameMinute } from "date-fns";

import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateEventDTO } from "@modules/projects/dtos/CreateEvent.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "@modules/projects/dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";

import { FindExistingEventDTO, ProjectsRepository } from "../projects.repository";

@Injectable()
export class FakeProjectsRepository implements ProjectsRepository {
  private editions: ProjectEdition[] = [];
  private events: ProjectEvent[] = [];
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

  async createEvent({ capacity, location, onSite, ...data }: CreateEventDTO): Promise<ProjectEvent> {
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

  async createParticipation({
    editionId,
    eventId,
    ...data
  }: CreateParticipationDTO): Promise<ProjectParticipation> {
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

  async findByTitle(title: string): Promise<Project | null> {
    const project = this.projects.find(project => project.title === title) as Project | null;

    return project;
  }

  async findEditionById(id: string): Promise<ProjectEdition | null> {
    const edition = this.editions.find(edition => edition.id === id) as ProjectEdition | null;

    return edition;
  }

  async findExistingEvent({
    editionId,
    location,
    startTime,
  }: FindExistingEventDTO): Promise<ProjectEvent | null> {
    const event = this.events.find(
      event =>
        event.editionId === editionId &&
        event.location === location &&
        isSameHour(event.startTime, startTime) &&
        isSameMinute(event.startTime, startTime),
    ) as ProjectEvent | null;

    return event;
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
    eventId,
    participantId,
  }: CreateParticipationDTO): Promise<ProjectParticipation | null> {
    const participation = this.participations.find(
      participation =>
        participation.participantId === participantId &&
        (participation.editionId === editionId || participation.eventId === eventId),
    ) as ProjectParticipation | null;

    return participation;
  }
}
