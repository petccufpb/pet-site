import { QueryRequired } from "@hyoretsu/decorators";
import { Body, Controller, Get, Post } from "@nestjs/common";
import {
  Project,
  ProjectCertificate,
  ProjectEdition,
  ProjectEvent,
  ProjectParticipant,
  ProjectParticipation,
  ProjectSpeaker,
} from "@prisma/client";

import CreateCertificateDTO from "@modules/projects/dtos/CreateCertificate.dto";
import CreateCertificatesDTO from "@modules/projects/dtos/CreateCertificates.dto";
import CreateEditionDTO from "@modules/projects/dtos/CreateEdition.dto";
import CreateEventDTO from "@modules/projects/dtos/CreateEvent.dto";
import CreateParticipantDTO from "@modules/projects/dtos/CreateParticipant.dto";
import CreateParticipationDTO from "@modules/projects/dtos/CreateParticipation.dto";
import CreateProjectDTO from "@modules/projects/dtos/CreateProject.dto";
import CreateSpeakerDTO from "@modules/projects/dtos/CreateSpeaker.dto";
import ValidateCertificateDTO from "@modules/projects/dtos/ValidateCertificate.dto";
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
import ListEditions from "@modules/projects/services/ListEditions.service";
import ValidateCertificate from "@modules/projects/services/ValidateCertificate.service";

@Controller("projects")
export default class ProjectsController {
  constructor(
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
    private listEditions: ListEditions,
    private validateCertificate: ValidateCertificate,
  ) {}

  @Post()
  async postProjects(@Body() body: CreateProjectDTO): Promise<Project> {
    const project = await this.createProject.execute(body);

    return project;
  }

  @Post("certificates")
  async postProjectsCertificates(
    @Body() { editionId, eventId }: CreateCertificatesDTO,
  ): Promise<ProjectCertificate[]> {
    let certificates: ProjectCertificate[];

    if (eventId) {
      certificates = await this.createEventCertificates.execute({ editionId, eventId });
    } else {
      certificates = await this.createEditionCertificates.execute(editionId);
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
  async getProjectsEditions(@QueryRequired("projectId") projectId: string): Promise<ProjectEdition[]> {
    const editions = await this.listEditions.execute({ projectId });

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

  @Post("events")
  async postProjectsEvents(@Body() body: CreateEventDTO): Promise<ProjectEvent> {
    const event = await this.createEvent.execute(body);

    return event;
  }

  @Post("participants")
  async postProjectsParticipants(@Body() body: CreateParticipantDTO): Promise<ProjectParticipant> {
    const participant = await this.createParticipant.execute(body);

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
