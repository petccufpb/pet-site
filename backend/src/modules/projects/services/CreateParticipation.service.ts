import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";

import { CreateParticipationDTO } from "../dtos/CreateParticipation.dto";
import { ProjectsRepository } from "../repositories/projects.repository";
import { CreateRepoParticipation } from "../repositories/projects.repository";

@Injectable()
export class CreateParticipation {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    editionId,
    eventId,
    matricula,
  }: CreateParticipationDTO): Promise<ProjectParticipation> {
    let participantId: string;

    if (email) {
      const foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this email.", HttpStatus.NOT_FOUND);
      }

      participantId = foundParticipant.id;
    } else if (matricula) {
      const foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this matricula.", HttpStatus.NOT_FOUND);
      }

      participantId = foundParticipant.id;
    } else {
      throw new HttpException("You need to provide either an email or a matricula.", HttpStatus.BAD_REQUEST);
    }

    let payload: CreateRepoParticipation;

    if (eventId) {
      const event = await this.projectsRepository.findEventById(eventId);
      if (!event) {
        throw new HttpException("This event does not exist", HttpStatus.NOT_FOUND);
      }

      const editionParticipation = await this.projectsRepository.findParticipation({
        editionId: event.editionId,
        participantId,
      });
      if (!editionParticipation) {
        throw new HttpException(
          "You need to be participating in the main edition in order to participante in an event",
          HttpStatus.FORBIDDEN,
        );
      }

      payload = {
        eventId,
        participantId,
      };
    } else {
      const edition = await this.projectsRepository.findEditionById(editionId as string);
      if (!edition) {
        throw new HttpException("This edition does not exist", HttpStatus.NOT_FOUND);
      }

      payload = {
        editionId,
        participantId,
      };
    }

    const existingParticipation = await this.projectsRepository.findParticipation(payload);
    if (existingParticipation) {
      throw new HttpException("This participation already exists.", HttpStatus.FORBIDDEN);
    }

    const participation = await this.projectsRepository.createParticipation(payload);

    return participation;
  }
}
