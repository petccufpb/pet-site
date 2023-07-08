import { Injectable } from "@nestjs/common";
import { ProjectSpeaker } from "@prisma/client";

import CreateSpeakerDTO from "../dtos/CreateSpeaker.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateSpeaker {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(data: CreateSpeakerDTO): Promise<ProjectSpeaker> {
    const speaker = await this.projectsRepository.createSpeaker(data);

    return speaker;
  }
}
