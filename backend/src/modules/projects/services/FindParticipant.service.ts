import { HttpException, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import FindParticipantDTO from "../dtos/FindParticipant.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class FindParticipant {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    matricula,
    participantId,
    phoneNumber,
  }: FindParticipantDTO): Promise<ProjectParticipant | null> {
    let participant: ProjectParticipant | null = null;

    if (participantId) {
      participant = await this.projectsRepository.findParticipantById(participantId);
    } else if (email) {
      participant = await this.projectsRepository.findParticipantByEmail(email);
    } else if (matricula) {
      participant = await this.projectsRepository.findParticipantByMatricula(matricula);
    } else if (phoneNumber) {
      participant = await this.projectsRepository.findParticipantByPhone(phoneNumber);
    }

    return participant;
  }
}
