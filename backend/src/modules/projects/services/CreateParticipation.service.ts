import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectParticipation } from "@prisma/client";

import { CreateParticipationDTO } from "../dtos/CreateParticipation.dto";
import { ProjectsRepository } from "../repositories/projects.repository";

@Injectable()
export class CreateParticipation {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ email, matricula, ...data }: CreateParticipationDTO): Promise<ProjectParticipation> {
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

    const existingParticipation = await this.projectsRepository.findSameParticipation(payload);
    if (existingParticipation) {
      throw new HttpException("This participation already exists.", HttpStatus.FORBIDDEN);
    }

    const participation = await this.projectsRepository.createParticipation(payload);

    return participation;
  }
}
