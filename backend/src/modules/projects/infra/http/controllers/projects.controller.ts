import { QueryRequired } from "@hyoretsu/decorators";
import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from "@nestjs/common";
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

import CreateAttendanceDTO from "@modules/projects/dtos/CreateAttendance.dto";
import CreateCertificateDTO from "@modules/projects/dtos/CreateCertificate.dto";
import CreateCertificatesDTO from "@modules/projects/dtos/CreateCertificates.dto";
import CreateEditionDTO from "@modules/projects/dtos/CreateEdition.dto";
import CreateEventDTO from "@modules/projects/dtos/CreateEvent.dto";
import CreateParticipantDTO from "@modules/projects/dtos/CreateParticipant.dto";
import CreateParticipationDTO from "@modules/projects/dtos/CreateParticipation.dto";
import CreateProjectDTO from "@modules/projects/dtos/CreateProject.dto";
import CreateSpeakerDTO from "@modules/projects/dtos/CreateSpeaker.dto";
import FindParticipantDTO from "@modules/projects/dtos/FindParticipant.dto";
import ValidateCertificateDTO from "@modules/projects/dtos/ValidateCertificate.dto";
import { CompleteProjectCertificate } from "@modules/projects/repositories/projects.repository";
import CreateAttendance from "@modules/projects/services/CreateAttendance.service";
import CreateCertificate from "@modules/projects/services/CreateCertificate.service";
import CreateEdition from "@modules/projects/services/CreateEdition.service";
import CreateEditionCertificates from "@modules/projects/services/CreateEditionCertificates.service";
import CreateEvent from "@modules/projects/services/CreateEvent.service";
import CreateEventCertificates from "@modules/projects/services/CreateEventCertificates.service";
import CreateParticipant from "@modules/projects/services/CreateParticipant.service";
import CreateParticipation from "@modules/projects/services/CreateParticipation.service";
import CreateProject from "@modules/projects/services/CreateProject.service";
import CreateSpeaker from "@modules/projects/services/CreateSpeaker.service";
import FindLatestEdition from "@modules/projects/services/FindLatestEdition.service";
import FindParticipant from "@modules/projects/services/FindParticipant.service";
import ListAttendees, { ListAttendeesResponse } from "@modules/projects/services/ListAttendees.service";
import ListCertificates from "@modules/projects/services/ListCertificates.service";
import ListEditions from "@modules/projects/services/ListEditions.service";
import ListEvents from "@modules/projects/services/ListEvents.service";
import ListParticipants, {
  ListParticipantsResponse,
} from "@modules/projects/services/ListParticipants.service";
import ValidateCertificate from "@modules/projects/services/ValidateCertificate.service";

@Controller("projects")
export default class ProjectsController {
  constructor(
    private createAttendance: CreateAttendance,
    private createCertificate: CreateCertificate,
    private createEdition: CreateEdition,
    private createEditionCertificates: CreateEditionCertificates,
    private createEvent: CreateEvent,
    private createEventCertificates: CreateEventCertificates,
    private createParticipant: CreateParticipant,
    private createParticipation: CreateParticipation,
    private createProject: CreateProject,
    private createSpeaker: CreateSpeaker,
    private findLatestEdition: FindLatestEdition,
    private findParticipant: FindParticipant,
    private listAttendees: ListAttendees,
    private listCertificates: ListCertificates,
    private listEditions: ListEditions,
    private listEvents: ListEvents,
    private listParticipants: ListParticipants,
    private validateCertificate: ValidateCertificate,
  ) {}

  @Post()
  async postProjects(@Body() body: CreateProjectDTO): Promise<Project> {
    const project = await this.createProject.execute(body);

    return project;
  }

  @Get("attendance")
  async getProjectsAttendance(
    @Query("course")
    course: string,
    @Query("editionId")
    editionId: string,
    @Query("eventId")
    eventId: string,
    @Query("participantId")
    participantId?: string,
  ): Promise<ListAttendeesResponse> {
    const attendances = await this.listAttendees.execute({ course, editionId, eventId, participantId });

    return attendances;
  }

  @Post("attendance")
  async postProjectsAttendance(@Body() body: CreateAttendanceDTO): Promise<ProjectAttendance> {
    const attendance = await this.createAttendance.execute(body);

    return attendance;
  }

  @Get("certificates")
  async getProjectsCertificates(
    @Query("editionId")
    editionId?: string,
    @Query("eventId")
    eventId?: string,
    @Query("participantId")
    participantId?: string,
  ): Promise<CompleteProjectCertificate[]> {
    const certificates = await this.listCertificates.execute({
      editionId,
      eventId,
      participantId,
    });

    return certificates;
  }

  @Post("certificates")
  async postProjectsCertificates(
    @Body() { editionId, eventId }: CreateCertificatesDTO,
  ): Promise<ProjectCertificate[]> {
    let certificates: ProjectCertificate[];

    if (eventId) {
      certificates = await this.createEventCertificates.execute(eventId);
    } else if (editionId) {
      certificates = await this.createEditionCertificates.execute(editionId);
    } else {
      throw new HttpException(
        "Você deve enviar uma edição ou evento para gerar certificados",
        HttpStatus.BAD_REQUEST,
      );
    }

    return certificates;
  }

  @Post("certificates/create")
  async postProjectsCertificatesCreate(@Body() body: CreateCertificateDTO): Promise<ProjectCertificate> {
    const certificates = await this.createCertificate.execute(body);

    return certificates;
  }

  @Post("certificates/validate")
  async postProjectsCertificatesValidate(@Body() body: ValidateCertificateDTO): Promise<boolean> {
    const validity = await this.validateCertificate.execute(body);

    return validity;
  }

  @Get("editions")
  async getProjectsEditions(
    @Query("id") editionId?: string,
    @Query("project") projectTitle?: string,
  ): Promise<ProjectEdition[]> {
    const editions = await this.listEditions.execute({ editionId, projectTitle });

    return editions;
  }

  @Post("editions")
  async postProjectsEditions(@Body() body: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.createEdition.execute(body);

    return edition;
  }

  @Get("editions/latest")
  async getProjectsEditionsLatest(@QueryRequired("project") projectTitle: string): Promise<ProjectEdition> {
    const edition = await this.findLatestEdition.execute({
      projectTitle,
    });

    return edition;
  }

  @Get("events")
  async getProjectsEvents(
    @Query("editionId") editionId?: string,
    @Query("id") eventId?: string,
  ): Promise<ProjectEvent[]> {
    const events = await this.listEvents.execute({ editionId, eventId });

    return events;
  }

  @Post("events")
  async postProjectsEvents(@Body() body: CreateEventDTO): Promise<ProjectEvent> {
    const event = await this.createEvent.execute(body);

    return event;
  }

  @Get("participants")
  async getProjectsParticipants(
    @Query("birthYear")
    birthYear: string,
    @Query("course")
    course: string,
    @Query("editionId")
    editionId: string,
    @Query("eventId")
    eventId: string,
    @Query("periodoGeral")
    periodoGeral: string,
    @Query("university")
    university: string,
  ): Promise<ListParticipantsResponse> {
    const participants = await this.listParticipants.execute({
      birthYear: Number(birthYear),
      course,
      editionId,
      eventId,
      periodoGeral: Number(periodoGeral),
      university,
    });

    return participants;
  }

  @Post("participants")
  async postProjectsParticipants(@Body() body: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = await this.createParticipant.execute(body);

    return participant;
  }

  @Post("participants/find")
  async postProjectsParticipantsFind(@Body() body: FindParticipantDTO): Promise<ProjectParticipant | null> {
    const participant = await this.findParticipant.execute(body);

    return participant;
  }

  @Post("participations")
  async postProjectsParticipations(@Body() body: CreateParticipationDTO): Promise<ProjectParticipation> {
    const participation = await this.createParticipation.execute(body);

    return participation;
  }

  @Post("speakers")
  async postProjectsSpeakers(@Body() body: CreateSpeakerDTO): Promise<ProjectSpeaker> {
    const speaker = await this.createSpeaker.execute(body);

    return speaker;
  }
}
