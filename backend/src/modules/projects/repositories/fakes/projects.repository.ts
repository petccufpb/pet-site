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

  public async createCertificate({
    attendance,
    editionId,
    eventId,
    ...data
  }: CertificateInfo): Promise<ProjectCertificate> {
    const certificate = {
      ...data,
      attendance: attendance || null,
      editionId: editionId || null,
      eventId: eventId || null,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.certificates.push(certificate);

    return certificate;
  }

  public async createCertificates(data: CertificateInfo[]): Promise<void> {
    data.forEach(({ attendance, editionId, eventId, ...info }) => {
      const certificate = {
        ...info,
        attendance: attendance || null,
        editionId: editionId || null,
        eventId: eventId || null,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.certificates.push(certificate);
    });
  }

  public async createEdition({
    logoUrl,
    minimumAttendance,
    name,
    number,
    ...data
  }: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = {
      ...data,
      logoUrl: logoUrl || null,
      minimumAttendance: minimumAttendance || 100,
      name: name || "",
      number: number || 1,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.editions.push(edition);

    return edition;
  }

  public async createEvent({
    allowMultiple,
    capacity,
    externalSignup,
    extraCapacity,
    location,
    onSite,
    ...data
  }: CreateEventDTO): Promise<ProjectEvent> {
    const event = {
      ...data,
      capacity: capacity || null,
      externalSignup: externalSignup || null,
      extraCapacity: extraCapacity || 0,
      location: location || null,
      onSite: onSite || true,
      allowMultiple: allowMultiple || false,
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

  public async deleteParticipation(participantId: string, eventId: string): Promise<void> {
    const participationIndex = this.participations.findIndex(
      participation => participation.participantId === participantId && participation.eventId === eventId,
    );

    this.participations.splice(participationIndex);
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
          attendees: this.attendances.filter(attendance => attendance.eventId === event.id),
          participants: this.participations.filter(participation => participation.eventId === event.id),
          speaker: this.speakers.find(speaker => speaker.id === event.speakerId) as ProjectSpeaker,
        }));
    });

    editions.sort((a, b) => Number(isBefore(a.date, b.date)) * 2 - 1);

    return editions;
  }

  public async findAllEvents(): Promise<ProjectEvent[]> {
    return this.events;
  }

  public async findAttendance({
    eventId,
    participantId,
  }: CreateRepoAttendance): Promise<CompleteProjectAttendance | null> {
    const attendance =
      (this.attendances.find(
        attendance => attendance.participantId === participantId && attendance.eventId === eventId,
      ) as CompleteProjectAttendance) || null;

    if (attendance) {
      attendance.event = this.events.find(event => event.id === eventId) || null;
      attendance.participant = this.participants.find(
        participant => participant.id === participantId,
      ) as ProjectParticipant;
    }

    return attendance;
  }

  public async findAttendancesByEvent(eventId: string): Promise<CompleteProjectAttendance[]> {
    const attendances = this.attendances.filter(
      attendance => attendance.eventId === eventId,
    ) as CompleteProjectAttendance[];

    for (const attendance of attendances) {
      attendance.event = this.events.find(event => event.id === eventId) || null;
      attendance.participant = this.participants.find(
        participant => participant.id === attendance.participantId,
      ) as ProjectParticipant;
    }

    return attendances;
  }

  public async findCertificateById(id: string): Promise<ProjectCertificate | null> {
    const certificate = (await this.certificates.find(certificate => certificate.id === id)) || null;

    return certificate;
  }

  public async findCertificatesByEditionId(editionId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = this.certificates.filter(
      certificate => certificate.editionId === editionId && certificate.eventId === null,
    ) as CompleteProjectCertificate[];

    return certificates;
  }

  public async findCertificatesByEventId(eventId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = this.certificates.filter(
      certificate => certificate.eventId === eventId,
    ) as CompleteProjectCertificate[];

    return certificates;
  }

  public async findCertificatesByParticipantId(participantId: string): Promise<CompleteProjectCertificate[]> {
    const certificates = this.certificates.filter(
      certificate => certificate.participantId === participantId,
    ) as CompleteProjectCertificate[];

    return certificates;
  }

  public async findEditionById(id: string): Promise<CompleteProjectEdition | null> {
    const edition = (this.editions.find(edition => edition.id === id) as CompleteProjectEdition) || null;

    if (edition) {
      edition.events = this.events
        .filter(event => event.editionId === id)
        .map(event => ({
          ...event,
          attendees: this.attendances.filter(attendance => attendance.eventId === event.id),
          participants: this.participations.filter(participation => participation.eventId === event.id),
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
      event.participants = this.participations.filter(participation => participation.eventId === event.id);
      event.speaker = this.speakers.find(speaker => speaker.id === event.speakerId) as ProjectSpeaker;
    }

    return event;
  }

  public async findEventParticipationsByEdition(editionId: string): Promise<ProjectParticipation[]> {
    const edition =
      (this.editions.find(edition => edition.id === editionId) as CompleteProjectEdition) || null;

    if (edition) {
      // @ts-ignore
      edition.events = this.events.filter(event => event.editionId === editionId);
      edition.events.forEach((event, index) => {
        const completeEvent = event;
        completeEvent.attendees = this.attendances.filter(attendance => attendance.eventId === event.id);
        completeEvent.participants = this.participations.filter(
          participation => participation.eventId === event.id,
        );

        edition.events[index] = completeEvent;
      });
    }

    const participations: ProjectParticipation[] = [];
    edition?.events.forEach(event => {
      event.participants.forEach(participation => {
        participations.push(participation);
      });
    });

    return participations;
  }

  public async findEventsByEdition(editionId: string): Promise<ProjectEvent[]> {
    const events = this.events.filter(event => event.editionId === editionId);

    return events;
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

  public async findExistingParticipant({
    email,
    matricula,
    phoneNumber,
  }: FindExistingParticipantDTO): Promise<ProjectParticipant | null> {
    const participant =
      this.participants.find(
        participant =>
          participant.email === email ||
          participant.matricula === matricula ||
          participant.phoneNumber === phoneNumber,
      ) || null;

    return participant;
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

  public async findParticipants(ids: string[]): Promise<ProjectParticipant[]> {
    const participants = this.participants.filter(participant => ids.includes(participant.id));

    return participants;
  }

  public async findParticipantsByEdition(editionId: string): Promise<ProjectParticipant[]> {
    const participations = this.participations.filter(participation => participation.editionId === editionId);
    const participantIds = participations.map(participation => participation.participantId);

    return this.participants.filter(participant => participantIds.includes(participant.id));
  }

  public async findParticipantsByEvent(eventId: string): Promise<ProjectParticipant[]> {
    const participations = this.participations.filter(participation => participation.editionId === eventId);
    const participantIds = participations.map(participation => participation.participantId);

    return this.participants.filter(participant => participantIds.includes(participant.id));
  }

  public async findParticipation({
    editionId,
    eventId,
    participantId,
  }: CreateRepoParticipation): Promise<ProjectParticipation | null> {
    const participation =
      this.participations.find(participation => {
        if (participation.participantId === participantId) {
          if (editionId && participation.editionId === editionId) {
            return true;
          }
          if (eventId && participation.eventId === eventId) {
            return true;
          }
        }

        return false;
      }) || null;

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

  public async findSpeakerById(id: string): Promise<ProjectSpeaker | null> {
    const speaker = this.speakers.find(speaker => speaker.id === id) || null;

    return speaker;
  }

  public async updateParticipant(
    id: string,
    { course, email, phoneNumber }: UpdateParticipantDTO,
  ): Promise<ProjectParticipant> {
    const participant = this.participants.find(speaker => speaker.id === id)!;

    if (course) {
      Object.assign(participant, { course });
    }
    if (email) {
      Object.assign(participant, { email });
    }
    if (phoneNumber) {
      Object.assign(participant, { phoneNumber });
    }

    return participant;
  }
}
