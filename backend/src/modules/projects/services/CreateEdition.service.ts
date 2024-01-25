import { directLink } from "@hyoretsu/utils";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition } from "@prisma/client";

import CreateEditionDTO from "../dtos/CreateEdition.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateEdition {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ logoUrl, number, projectId, ...data }: CreateEditionDTO): Promise<ProjectEdition> {
    const existingEdition = await this.projectsRepository.findEditionByNumber({ number, projectId });
    if (existingEdition) {
      throw new HttpException("Já existe uma edição com esse número para esse projeto", HttpStatus.FORBIDDEN);
    }

    const edition = await this.projectsRepository.createEdition({
      ...data,
      logoUrl: logoUrl && directLink(logoUrl),
      number,
      projectId,
    });

    return edition;
  }
}
