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
      throw new HttpException("Forneça uma localização para eventos presenciais", HttpStatus.BAD_REQUEST);
    }

    if (isBefore(new Date(endTime), new Date(startTime))) {
      throw new HttpException("Horário de término é antes do horário de início", HttpStatus.BAD_REQUEST);
    }

    const edition = await this.projectsRepository.findEditionById(editionId);
    if (!edition) {
      throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
    }

    if (isBefore(new Date(startTime), new Date(edition.date))) {
      throw new HttpException(
        "Horário de início do evento é antes da data de início da edição",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (onSite) {
      const existingEvent = await this.projectsRepository.findExistingEvent({
        editionId,
        location,
        startTime,
      });

      if (existingEvent) {
        throw new HttpException(
          "Um evento já existe no mesmo local e horário para esta edição",
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
