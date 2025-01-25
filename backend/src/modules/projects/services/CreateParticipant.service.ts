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
    email = email.toLowerCase();

    const existingParticipant = await this.projectsRepository.findExistingParticipant({
      email,
      matricula,
      phoneNumber,
    });
    if (
      existingParticipant &&
      existingParticipant.email === email &&
      existingParticipant.matricula === matricula &&
      existingParticipant.phoneNumber === phoneNumber
    ) {
      return existingParticipant;
    }

    if (existingParticipant) {
      const sameEmail = await this.projectsRepository.findParticipantByEmail(email);
      if (sameEmail?.id !== existingParticipant.id) {
        throw new HttpException("Já existe um aluno com esse email", HttpStatus.FORBIDDEN);
      }

      const samePhone = await this.projectsRepository.findParticipantByPhone(phoneNumber);
      if (samePhone?.id !== existingParticipant.id) {
        throw new HttpException("Já existe um aluno com esse telefone", HttpStatus.FORBIDDEN);
      }

      const sameMatricula = await this.projectsRepository.findParticipantByMatricula(matricula);
      if (sameMatricula?.id !== existingParticipant.id) {
        throw new HttpException("Já existe um aluno com essa matrícula", HttpStatus.FORBIDDEN);
      }

      const updatedParticipant = await this.projectsRepository.updateParticipant(existingParticipant.id, {
        ...data,
        email,
        matricula,
        phoneNumber,
      });

      return updatedParticipant;
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
