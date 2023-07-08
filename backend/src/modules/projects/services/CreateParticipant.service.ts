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
    name,
    phoneNumber,
    ...data
  }: CreateParticipantDTO): Promise<ProjectParticipant> {
    const existingParticipant = await this.projectsRepository.findExistingParticipant({
      email,
      matricula,
      name,
    });
    if (existingParticipant) {
      return existingParticipant;
    }

    const sameEmail = await this.projectsRepository.findParticipantByEmail(email);
    if (sameEmail) {
      throw new HttpException("Já existe um aluno com esse email", HttpStatus.FORBIDDEN);
    }

    const sameMatricula = await this.projectsRepository.findParticipantByMatricula(matricula);
    if (sameMatricula) {
      throw new HttpException("Já existe um aluno com essa matrícula", HttpStatus.FORBIDDEN);
    }

    const samePhone = await this.projectsRepository.findParticipantByPhone(phoneNumber);
    if (samePhone) {
      throw new HttpException("Já existe um aluno com esse telefone", HttpStatus.FORBIDDEN);
    }

    const participant = await this.projectsRepository.createParticipant({
      ...data,
      email,
      matricula,
      name,
      phoneNumber,
    });

    return participant;
  }
}
