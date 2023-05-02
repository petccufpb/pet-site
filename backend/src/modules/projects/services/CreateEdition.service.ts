import { Injectable } from "@nestjs/common";
import { ProjectEdition } from "@prisma/client";

import { CreateEditionDTO } from "../dtos/CreateEdition.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateEdition {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(data: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.projectsRepository.createEdition(data);

    return edition;
  }
}
