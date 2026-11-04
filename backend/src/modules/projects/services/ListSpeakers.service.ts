import { Injectable } from "@nestjs/common";
import { ProjectSpeaker } from "@prisma/client";

import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListSpeakers {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(): Promise<ProjectSpeaker[]> {
    return this.projectsRepository.findSpeakers();
  }
}
