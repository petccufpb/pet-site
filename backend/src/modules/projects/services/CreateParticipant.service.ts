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
      const sameMatricula = await this.projectsRepository.findParticipantByMatricula(matricula);
      const samePhone = await this.projectsRepository.findParticipantByPhone(phoneNumber);

      const updatingEmail = sameEmail?.id === existingParticipant.id;
      const updatingMatricula = sameMatricula?.id === existingParticipant.id;
      const updatingPhone = samePhone?.id === existingParticipant.id;

      if ([updatingEmail, updatingMatricula, updatingPhone].filter(Boolean).length > 1) {
        throw new HttpException(
          "Só é possível trocar uma dessas informações: email, matrícula ou telefone.",
          HttpStatus.FORBIDDEN,
        );
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
