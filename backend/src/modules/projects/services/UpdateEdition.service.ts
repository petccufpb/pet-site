import { directLink } from "@hyoretsu/utils";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition } from "@prisma/client";

import UpdateEditionDTO from "../dtos/UpdateEdition.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class UpdateEdition {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(id: string, data: UpdateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.projectsRepository.findEditionById(id);
    if (!edition) {
      throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
    }

    if (data.number !== undefined) {
      const targetProjectId = data.projectId || edition.projectId;
      const existingWithNumber = await this.projectsRepository.findEditionByNumber({
        number: data.number,
        projectId: targetProjectId,
      });

      if (existingWithNumber && existingWithNumber.id !== id) {
        throw new HttpException("Já existe uma edição com esse número para esse projeto", HttpStatus.FORBIDDEN);
      }
    }

    const updatedEdition = await this.projectsRepository.updateEdition(id, {
      ...data,
      logoUrl: data.logoUrl !== undefined ? (data.logoUrl ? directLink(data.logoUrl) : undefined) : undefined,
    });

    return updatedEdition;
  }
}
