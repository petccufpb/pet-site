import { Body, Controller, Post } from "@nestjs/common";
import { Project, ProjectEdition } from "@prisma/client";

import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { CreateEdition } from "@modules/projects/services/CreateEdition.service";
import { CreateProject } from "@modules/projects/services/CreateProject.service";

@Controller("projects")
export default class ProjectsController {
  constructor(private createEdition: CreateEdition, private createProject: CreateProject) {}

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
}
