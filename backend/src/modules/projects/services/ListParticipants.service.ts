import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectParticipation } from "@prisma/client";
import { isSameYear } from "date-fns";

import ListParticipantsDTO from "../dtos/ListParticipants.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ListParticipants {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    birthYear,
    course,
    editionId,
    eventId,
    periodoGeral,
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

    let participants = await this.projectsRepository.findParticipants(
      participations.map(participation => participation.participantId),
    );

    if (birthYear) {
      participants = participants.filter(participant =>
        isSameYear(new Date(participant.course), new Date(birthYear, 0)),
      );
    }
    if (course) {
      participants = participants.filter(participant => participant.course === course);
    }
    if (periodoGeral) {
      participants = participants.filter(participant =>
        participant.matricula.startsWith(String(periodoGeral)),
      );
    }
    if (university) {
      participants = participants.filter(participant => participant.university === university);
    }

    return participants;
  }
}
