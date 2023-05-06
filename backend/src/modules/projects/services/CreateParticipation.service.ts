import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipation } from "@prisma/client";

import { CreateParticipationDTO } from "../dtos/CreateParticipation.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateParticipation {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(data: CreateParticipationDTO): Promise<ProjectParticipation> {
    const existingParticipation = await this.projectsRepository.findSameParticipation(data);
    if (existingParticipation) {
      throw new HttpException("This participation already exists.", HttpStatus.FORBIDDEN);
    }

    const participation = await this.projectsRepository.createParticipation(data);

    return participation;
  }
}
