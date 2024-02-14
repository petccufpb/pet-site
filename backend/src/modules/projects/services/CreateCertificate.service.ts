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
    participantId,
  }: CreateCertificateDTO): Promise<ProjectCertificate> {
    if (participantId) {
      const foundParticipant = await this.projectsRepository.findParticipantById(participantId);
      if (!foundParticipant) {
        throw new HttpException("Não existe um aluno com esse ID", HttpStatus.NOT_FOUND);
      }
    } else {
      if (email) {
        const foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com esse email", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else if (matricula) {
        const foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com essa matrícula", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else {
        throw new HttpException("Você deve enviar um email, matrícula ou ID", HttpStatus.BAD_REQUEST);
      }
    }

    const existingCertificate = (
      await this.projectsRepository.findCertificatesByParticipantId(participantId)
    ).filter(certificate =>
      editionId ? certificate.editionId === editionId : certificate.eventId === eventId,
    );

    if (existingCertificate.length > 0) {
      throw new HttpException("Esse certificado já existe", HttpStatus.FORBIDDEN);
    }

    if (editionId) {
      const edition = await this.projectsRepository.findEditionById(editionId);
      if (!edition) {
        throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
      }

      const certificate = await this.projectsRepository.createCertificate({
        attendance: 100,
        editionId,
        participantId,
      });

      return certificate;
    } else {
      const event = await this.projectsRepository.findEventById(eventId as string);
      if (!event) {
        throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
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
