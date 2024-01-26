import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import CreateParticipantDTO from "../dtos/CreateParticipant.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateParticipant {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    course,
    email,
    matricula,
    name,
    phoneNumber,
    ...data
  }: CreateParticipantDTO): Promise<ProjectParticipant> {
    const existingParticipant = await this.projectsRepository.findExistingParticipant({
      matricula,
      name,
    });
    if (
      existingParticipant &&
      existingParticipant.phoneNumber === phoneNumber &&
      existingParticipant.email === email
    ) {
      return existingParticipant;
    }

    const sameEmail = await this.projectsRepository.findParticipantByEmail(email);
    if (sameEmail && sameEmail.id !== existingParticipant?.id) {
      throw new HttpException("Já existe um aluno com esse email", HttpStatus.FORBIDDEN);
    }

    const samePhone = await this.projectsRepository.findParticipantByPhone(phoneNumber);
    console.log(existingParticipant);
    console.log(samePhone);
    if (samePhone && samePhone.id !== existingParticipant?.id) {
      throw new HttpException("Já existe um aluno com esse telefone", HttpStatus.FORBIDDEN);
    }

    const sameMatricula = await this.projectsRepository.findParticipantByMatricula(matricula);

    if (
      sameMatricula?.id !== existingParticipant?.id ||
      sameMatricula?.name.toLowerCase() !== name.toLowerCase()
    ) {
      throw new HttpException("Já existe um aluno com essa matrícula", HttpStatus.FORBIDDEN);
    }

    if (sameMatricula?.id === existingParticipant?.id) {
      const updatedParticipant = await this.projectsRepository.updateParticipant(sameMatricula!.id, {
        course,
        email,
        phoneNumber,
      });

      return updatedParticipant;
    }

    const participant = await this.projectsRepository.createParticipant({
      ...data,
      course,
      email,
      matricula,
      name,
      phoneNumber,
    });

    return participant;
  }
}
