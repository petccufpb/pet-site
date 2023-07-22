import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import ListAttendeesDTO from "../dtos/ListAttendees.dto";
import ProjectsRepository, { CompleteProjectAttendance } from "../repositories/projects.repository";

export interface ListAttendeesResponse {
  total: number;
  attendees?: (ProjectParticipant | null)[];
  attendances?: CompleteProjectAttendance[];
}

@Injectable()
export default class ListAttendees {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    course,
    editionId,
    eventId,
    participantId,
  }: ListAttendeesDTO): Promise<ListAttendeesResponse> {
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

    if (course) {
      attendances = attendances.filter(attendance => attendance.participant!.course === course);
    }

    return {
      total: attendances.length,
      ...(eventId
        ? {
            attendees: attendances.map(attendance => attendance.participant),
          }
        : { attendances }),
    };
  }
}
