import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import CreateCertificateDTO from "../dtos/CreateCertificate.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateCertificate {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    email,
    eventId,
    matricula,
  }: CreateCertificateDTO): Promise<ProjectCertificate> {
    let participantId: string;

    if (email) {
      const foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this email", HttpStatus.NOT_FOUND);
      }

      participantId = foundParticipant.id;
    } else if (matricula) {
      const foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
      if (!foundParticipant) {
        throw new HttpException("There's no participant with this matricula", HttpStatus.NOT_FOUND);
      }

      participantId = foundParticipant.id;
    } else {
      throw new HttpException(
        "You need to provide an email, a matricula or the participant's ID",
        HttpStatus.BAD_REQUEST,
      );
    }

    if (editionId) {
      const edition = await this.projectsRepository.findEditionById(editionId);
      if (!edition) {
        throw new HttpException("This edition does not exist", HttpStatus.NOT_FOUND);
      }

      const certificate = await this.projectsRepository.createCertificate({
        editionId,
        participantId,
      });

      return certificate;
    } else {
      const event = await this.projectsRepository.findEventById(eventId as string);
      if (!event) {
        throw new HttpException("This event does not exist", HttpStatus.NOT_FOUND);
      }

      const certificate = await this.projectsRepository.createCertificate({
        editionId: event.editionId,
        eventId,
        participantId,
      });

      return certificate;
    }
  }
}
