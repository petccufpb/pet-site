import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Project } from "@prisma/client";

import { CreateProjectDTO } from "../dtos/CreateProject.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateProject {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ title, ...data }: CreateProjectDTO): Promise<Project> {
    const existingProject = await this.projectsRepository.findByTitle(title);
    if (existingProject) {
      throw new HttpException("There is already a project with this title.", HttpStatus.FORBIDDEN);
    }

    const project = await this.projectsRepository.create({ title, ...data });

    return project;
  }
}
