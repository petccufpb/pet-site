import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";
import { isSameYear } from "date-fns";

import ListParticipantsDTO from "../dtos/ListParticipants.dto";
import ProjectsRepository from "../repositories/projects.repository";

export interface ListParticipantsResponse {
  total: number;
  participants: ProjectParticipant[];
}

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
  }: ListParticipantsDTO): Promise<ListParticipantsResponse> {
    let participants: ProjectParticipant[];
    if (eventId) {
      participants = await this.projectsRepository.findParticipantsByEvent(eventId);
    } else {
      if (!editionId) {
        throw new HttpException(
          "É preciso selecionar uma edição ou evento para filtrar participantes",
          HttpStatus.BAD_REQUEST,
        );
      }

      participants = await this.projectsRepository.findParticipantsByEdition(editionId);
    }

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
        participant.matricula?.startsWith(String(periodoGeral)),
      );
    }
    if (university) {
      participants = participants.filter(participant => participant.university === university);
    }

    return {
      total: participants.length,
      participants,
    };
  }
}
