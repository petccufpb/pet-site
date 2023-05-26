import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import CreateParticipantDTO from "../dtos/CreateParticipant.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateParticipant {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    matricula,
    phoneNumber,
    ...data
  }: CreateParticipantDTO): Promise<ProjectParticipant> {
    const sameEmail = await this.projectsRepository.findParticipantByEmail(email);
    if (sameEmail) {
      throw new HttpException("There's already a participant with this email", HttpStatus.FORBIDDEN);
    }

    const sameMatricula = await this.projectsRepository.findParticipantByMatricula(matricula);
    if (sameMatricula) {
      throw new HttpException("There's already a participant with this matricula", HttpStatus.FORBIDDEN);
    }

    const samePhone = await this.projectsRepository.findParticipantByPhone(phoneNumber);
    if (samePhone) {
      throw new HttpException("There's already a participant with this phone number", HttpStatus.FORBIDDEN);
    }

    const participant = await this.projectsRepository.createParticipant({
      ...data,
      email,
      matricula,
      phoneNumber,
    });

    return participant;
  }
}
