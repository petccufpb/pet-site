import { Injectable } from "@nestjs/common";
import { ProjectEvent } from "@prisma/client";

import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListEvents {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(editionId?: string): Promise<ProjectEvent[]> {
    let events: ProjectEvent[];

    if (editionId) {
      events = await this.projectsRepository.findEventsByEdition(editionId);
    } else {
      events = await this.projectsRepository.findAllEvents();
    }

    return events;
  }
}
