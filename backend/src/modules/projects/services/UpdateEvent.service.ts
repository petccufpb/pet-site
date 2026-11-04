import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEvent } from "@prisma/client";
import { isBefore } from "date-fns";

import UpdateEventDTO from "../dtos/UpdateEvent.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class UpdateEvent {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(id: string, data: UpdateEventDTO): Promise<ProjectEvent> {
    const event = await this.projectsRepository.findEventById(id);
    if (!event) {
      throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
    }

    const effectiveStartTime = data.startTime ? new Date(data.startTime) : new Date(event.startTime);
    const effectiveEndTime = data.endTime ? new Date(data.endTime) : new Date(event.endTime);

    if (isBefore(effectiveEndTime, effectiveStartTime)) {
      throw new HttpException("Horário de término é antes do horário de início", HttpStatus.BAD_REQUEST);
    }

    const effectiveOnSite = data.onSite !== undefined ? data.onSite : event.onSite;
    const effectiveLocation = data.location !== undefined ? data.location : event.location;

    if (effectiveOnSite && !effectiveLocation) {
      throw new HttpException("Forneça uma localização para eventos presenciais", HttpStatus.BAD_REQUEST);
    }

    if (data.speakerId) {
      const speaker = await this.projectsRepository.findSpeakerById(data.speakerId);
      if (!speaker) {
        throw new HttpException("Esse palestrante não existe", HttpStatus.NOT_FOUND);
      }
    }

    const updatedEvent = await this.projectsRepository.updateEvent(id, data);

    return updatedEvent;
  }
}
