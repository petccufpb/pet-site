import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import ListAttendancesDTO from "../dtos/ListAttendances.dto";
import ProjectsRepository, { CompleteProjectAttendance } from "../repositories/projects.repository";

export interface ListAttendancesResponse {
  total: number;
  attendances: CompleteProjectAttendance[];
}

@Injectable()
export default class ListAttendances {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    eventId,
    participantId,
  }: ListAttendancesDTO): Promise<ListAttendancesResponse> {
    let attendances: CompleteProjectAttendance[] = [];

    if (editionId) {
      const events = await this.projectsRepository.findEventsByEdition(editionId);

      for (const event of events) {
        if (participantId) {
          const attendance = await this.projectsRepository.findAttendance({
            eventId: event.id,
            participantId,
          });

          if (attendance) {
            attendances.push(attendance);
          }
        } else {
          const attendances = await this.projectsRepository.findAttendancesByEvent(event.id);
          attendances.concat(attendances);
        }
      }
    } else if (eventId) {
      if (participantId) {
        const attendance = await this.projectsRepository.findAttendance({ eventId, participantId });
        if (attendance) {
          attendances.push(attendance);
        }
      } else {
        attendances = await this.projectsRepository.findAttendancesByEvent(eventId);
      }
    } else {
      throw new HttpException(
        "Envie uma edição ou um evento para listar as frequências",
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      total: attendances.length,
      attendances,
    };
  }
}
