import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectEdition, ProjectParticipant, ProjectParticipation } from "@prisma/client";

import CreateParticipationDTO from "../dtos/CreateParticipation.dto";
import ProjectsRepository from "../repositories/projects.repository";
import { CreateRepoParticipation } from "../repositories/projects.repository";

@Injectable()
export default class CreateParticipation {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    editionId,
    eventId,
    matricula,
    participantId,
  }: CreateParticipationDTO): Promise<ProjectParticipation> {
    if (participantId) {
      const foundParticipant = await this.projectsRepository.findParticipantById(participantId);
      if (!foundParticipant) {
        throw new HttpException("Não existe um aluno com esse ID", HttpStatus.NOT_FOUND);
      }
    } else {
      if (email) {
        const foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com esse email", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else if (matricula) {
        const foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com essa matrícula", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else {
        throw new HttpException("Você deve enviar um email, matrícula ou ID", HttpStatus.BAD_REQUEST);
      }
    }

    let payload: CreateRepoParticipation;

    if (eventId) {
      const event = await this.projectsRepository.findEventById(eventId);
      if (!event) {
        throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
      }

      const editionParticipation = await this.projectsRepository.findParticipation({
        editionId: event.editionId,
        participantId,
      });
      if (!editionParticipation) {
        throw new HttpException(
          "Você deve estar inscrito na edição correspondente para participar de um evento",
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
        throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
      }

      payload = {
        editionId,
        participantId,
      };
    }

    const existingParticipation = await this.projectsRepository.findParticipation(payload);
    if (existingParticipation) {
      throw new HttpException("Essa inscrição já existe", HttpStatus.FORBIDDEN);
    }

    const participation = await this.projectsRepository.createParticipation(payload);

    return participation;
  }
}
