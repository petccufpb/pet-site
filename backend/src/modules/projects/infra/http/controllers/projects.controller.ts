import { Body, Controller, Post } from "@nestjs/common";
import { Project } from "@prisma/client";

import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { CreateProject } from "@modules/projects/services/CreateProject.service";

@Controller("projects")
export default class ProjectsController {
  constructor(private createProject: CreateProject) {}

  @Post()
  async postProjects(@Body() body: CreateProjectDTO): Promise<Project> {
    const project = await this.createProject.execute(body);

    return project;
  }
}
