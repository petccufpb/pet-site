import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectSpeaker } from "@prisma/client";

import { CreateSpeakerDTO } from "../dtos/CreateSpeaker.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateSpeaker {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ email, ...data }: CreateSpeakerDTO): Promise<ProjectSpeaker> {
    const sameEmail = await this.projectsRepository.findSpeakerByEmail(email);
    if (sameEmail) {
      throw new HttpException("There is already a speaker with this email.", HttpStatus.CONFLICT);
    }

    const speaker = await this.projectsRepository.createSpeaker({ ...data, email });

    return speaker;
  }
}
