import { Body, Controller, Post } from "@nestjs/common";
import { Project, ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";

import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateParticipantDTO } from "@modules/projects/dtos/CreateParticipant.dto";
import { CreateParticipationDTO } from "@modules/projects/dtos/CreateParticipation.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { CreateEdition } from "@modules/projects/services/CreateEdition.service";
import { CreateParticipant } from "@modules/projects/services/CreateParticipant.service";
import { CreateParticipation } from "@modules/projects/services/CreateParticipation.service";
import { CreateProject } from "@modules/projects/services/CreateProject.service";

@Controller("projects")
export default class ProjectsController {
  constructor(
    private createEdition: CreateEdition,
    private createParticipant: CreateParticipant,
    private createParticipation: CreateParticipation,
    private createProject: CreateProject,
  ) {}

  @Post()
  async postProjects(@Body() body: CreateProjectDTO): Promise<Project> {
    const project = await this.createProject.execute(body);

    return project;
  }

  @Post("editions")
  async postProjectsEditions(@Body() body: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.createEdition.execute(body);

    return edition;
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
}
