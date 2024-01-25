import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition } from "@prisma/client";

import ListEditionsDTO from "../dtos/ListEditions.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListEditions {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ editionId, projectTitle }: ListEditionsDTO): Promise<ProjectEdition[]> {
    let editions: ProjectEdition[];

    if (editionId) {
      const edition = await this.projectsRepository.findEditionById(editionId);
      if (!edition) {
        throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
      }

      editions = [edition];
    } else if (projectTitle) {
      const project = await this.projectsRepository.findProjectByTitle(projectTitle);
      if (!project) {
        throw new HttpException("Não existe um projeto com esse nome", HttpStatus.NOT_FOUND);
      }

      editions = await this.projectsRepository.findAllEditions(project.id);
    } else {
      throw new HttpException("Você deve enviar um projeto ou edição para pesquisar", HttpStatus.BAD_REQUEST);
    }

    return editions;
  }
}
