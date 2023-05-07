import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectAttendance } from "@prisma/client";

import { CreateAttendanceDTO } from "../dtos/CreateAttendance.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateAttendance {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ email, eventId, matricula }: CreateAttendanceDTO): Promise<ProjectAttendance> {
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

    const event = await this.projectsRepository.findEventById(eventId);
    if (!event) {
      throw new HttpException("This event does not exist", HttpStatus.NOT_FOUND);
    }

    const participation = await this.projectsRepository.findParticipation({ eventId, participantId });
    if (!participation) {
      throw new HttpException("You must be participating in an event to attend it", HttpStatus.FORBIDDEN);
    }

    const payload = {
      eventId,
      participantId,
    };

    const existingAttendance = await this.projectsRepository.findSameAttendance(payload);
    if (existingAttendance) {
      throw new HttpException("This attendance already exists.", HttpStatus.CONFLICT);
    }

    const Attendance = await this.projectsRepository.createAttendance(payload);

    return Attendance;
  }
}
