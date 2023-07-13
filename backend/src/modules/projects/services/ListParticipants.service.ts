import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectParticipation } from "@prisma/client";

import ListParticipantsDTO from "../dtos/ListParticipants.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListParticipants {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    course,
    editionId,
    eventId,
    university,
  }: ListParticipantsDTO): Promise<ProjectParticipant[]> {
    let participations: ProjectParticipation[];
    if (eventId) {
      participations = await this.projectsRepository.findParticipationsByEvent(eventId);
    } else {
      if (!editionId) {
        throw new HttpException(
          "É preciso selecionar uma edição ou evento para filtrar participantes",
          HttpStatus.BAD_REQUEST,
        );
      }

      participations = await this.projectsRepository.findParticipationsByEdition(editionId);
    }

    const participants = await this.projectsRepository.findParticipants(
      participations.map(participation => participation.participantId),
    );

    if (course && university) {
      return participants.filter(
        participant => participant.course === course && participant.university === university,
      );
    } else if (course) {
      return participants.filter(participant => participant.course === course);
    } else if (university) {
      return participants.filter(participant => participant.university === university);
    }

    return participants;
  }
}
