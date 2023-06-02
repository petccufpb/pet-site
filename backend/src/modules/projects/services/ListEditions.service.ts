import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition } from "@prisma/client";

import ListEditionsDTO from "../dtos/ListEditions.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListEditions {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ projectId }: ListEditionsDTO): Promise<ProjectEdition[]> {
    const project = await this.projectsRepository.findProjectById(projectId);
    if (!project) {
      throw new HttpException("Esse projeto não existe", HttpStatus.NOT_FOUND);
    }

    const editions = await this.projectsRepository.findAllEditions(projectId);

    return editions;
  }
}
