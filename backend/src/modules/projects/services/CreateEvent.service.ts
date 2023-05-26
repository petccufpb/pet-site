import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEvent } from "@prisma/client";
import { isBefore } from "date-fns";

import CreateEventDTO from "../dtos/CreateEvent.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateEvent {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    endTime,
    location,
    onSite,
    startTime,
    ...data
  }: CreateEventDTO): Promise<ProjectEvent> {
    if (onSite && !location) {
      throw new HttpException("Please provide a location for on-site events", HttpStatus.BAD_REQUEST);
    }

    if (isBefore(endTime, startTime)) {
      throw new HttpException("End time is before start time", HttpStatus.BAD_REQUEST);
    }

    const edition = await this.projectsRepository.findEditionById(editionId);
    if (!edition) {
      throw new HttpException("This edition does not exist", HttpStatus.NOT_FOUND);
    }

    if (isBefore(startTime, edition.date)) {
      throw new HttpException("Start time is before this edition's date", HttpStatus.BAD_REQUEST);
    }

    if (onSite) {
      const existingEvent = await this.projectsRepository.findExistingEvent({
        editionId,
        location,
        startTime,
      });

      if (existingEvent) {
        throw new HttpException(
          "An event already exists at the same time and location for this edition",
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const event = await this.projectsRepository.createEvent({
      ...data,
      editionId,
      endTime,
      location,
      onSite,
      startTime,
    });

    return event;
  }
}
