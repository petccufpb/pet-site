import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import FindLatestEditionDTO from "../dtos/FindLatestEdition.dto";
import ProjectsRepository, { CompleteProjectEdition } from "../repositories/projects.repository";

@Injectable()
export default class FindLatestEdition {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ projectTitle }: FindLatestEditionDTO): Promise<CompleteProjectEdition> {
    const project = await this.projectsRepository.findProjectByTitle(projectTitle);
    if (!project) {
      throw new HttpException("Não existe um projeto com esse nome", HttpStatus.NOT_FOUND);
    }

    const editions = await this.projectsRepository.findAllEditions(project.id);

    return editions[0];
  }
}
