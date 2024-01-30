import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { differenceInHours } from "date-fns";

import DeleteParticipationDTO from "../dtos/DeleteParticipation.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class DeleteParticipation {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ eventId, ...data }: DeleteParticipationDTO): Promise<void> {
    const existingParticipant = await this.projectsRepository.findExistingParticipant(data);
    if (!existingParticipant) {
      throw new HttpException(
        "Os dados que você enviou não conferem. Por motivos de segurança não foi possível efetuar a desinscrição.",
        HttpStatus.UNAUTHORIZED,
      );
    }

    const existingEvent = await this.projectsRepository.findEventById(eventId);
    if (!existingEvent) {
      throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
    }

    if (differenceInHours(existingEvent.startTime, new Date()) <= 1) {
      throw new HttpException(
        "Você só pode se desinscrever de um evento no máximo 1h antes dele começar.",
        HttpStatus.FORBIDDEN,
      );
    }

    const existingParticipation = await this.projectsRepository.findParticipation({
      participantId: existingParticipant.id,
      eventId,
    });
    if (!existingParticipation) {
      throw new HttpException("Você não está inscrito nesse evento", HttpStatus.NOT_FOUND);
    }

    await this.projectsRepository.deleteParticipation(existingParticipant.id, eventId);
  }
}
