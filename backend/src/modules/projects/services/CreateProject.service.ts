import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Project } from "@prisma/client";

import CreateProjectDTO from "../dtos/CreateProject.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateProject {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ title, ...data }: CreateProjectDTO): Promise<Project> {
    const existingProject = await this.projectsRepository.findProjectByTitle(title);
    if (existingProject) {
      throw new HttpException("Já existe um projeto com esse nome", HttpStatus.FORBIDDEN);
    }

    const project = await this.projectsRepository.createProject({ title, ...data });

    return project;
  }
}
