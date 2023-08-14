import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEvent } from "@prisma/client";

import ListEventsDTO from "../dtos/ListEvents.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListEvents {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ editionId, eventId }: ListEventsDTO): Promise<ProjectEvent[]> {
    let events: ProjectEvent[];

    if (eventId) {
      const event = await this.projectsRepository.findEventById(eventId);
      if (!event) {
        throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
      }

      events = [event];
    } else if (editionId) {
      events = await this.projectsRepository.findEventsByEdition(editionId);
    } else {
      events = await this.projectsRepository.findAllEvents();
    }

    return events;
  }
}
