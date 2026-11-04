import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import SearchParticipantsDTO from "../dtos/SearchParticipants.dto";
import ProjectsRepository from "../repositories/projects.repository";

export type SearchParticipantsResponse = (ProjectParticipant & { attended?: boolean })[];

const MIN_QUERY_LENGTH = 2;
const SEARCH_LIMIT = 20;

@Injectable()
export default class SearchParticipants {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    eventId,
    q,
  }: SearchParticipantsDTO): Promise<SearchParticipantsResponse> {
    // O DTO valida o tamanho antes do trim; "  " viraria uma busca que casa com todo mundo
    const query = q.trim();
    if (query.length < MIN_QUERY_LENGTH) {
      throw new HttpException(
        `A busca deve ter pelo menos ${MIN_QUERY_LENGTH} caracteres`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const participants = await this.projectsRepository.searchParticipants({
      editionId,
      limit: SEARCH_LIMIT,
      query,
    });

    if (!eventId) {
      return participants;
    }

    const attendances = await this.projectsRepository.findAttendancesByEvent(eventId);
    const attendedIds = new Set(attendances.map(attendance => attendance.participantId));

    return participants.map(participant => ({
      ...participant,
      attended: attendedIds.has(participant.id),
    }));
  }
}
