import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectAttendance } from "@prisma/client";

import { CreateAttendanceDTO } from "../dtos/CreateAttendance.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateAttendance {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ email, matricula, ...data }: CreateAttendanceDTO): Promise<ProjectAttendance> {
    let participant: ProjectParticipant;

    if (email) {
      const foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this email.", HttpStatus.NOT_FOUND);
      }

      participant = foundParticipant;
    } else if (matricula) {
      const foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this matricula.", HttpStatus.NOT_FOUND);
      }

      participant = foundParticipant;
    } else {
      throw new HttpException("You need to provide either an email or a matricula.", HttpStatus.BAD_REQUEST);
    }

    const payload = {
      ...data,
      participantId: participant.id,
    };

    const existingAttendance = await this.projectsRepository.findSameAttendance(payload);
    if (existingAttendance) {
      throw new HttpException("This attendance already exists.", HttpStatus.CONFLICT);
    }

    const Attendance = await this.projectsRepository.createAttendance(payload);

    return Attendance;
  }
}
