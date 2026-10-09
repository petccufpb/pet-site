import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import CreateCertificateDTO from "../dtos/CreateCertificate.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateCertificate {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    attendance = 100,
    editionId,
    email,
    eventId,
    matricula,
    participantId,
  }: CreateCertificateDTO): Promise<ProjectCertificate> {
    
    // Normaliza a frequência caso venha em decimal (ex: 0.75 -> 75)
    if (attendance < 1) {
      attendance *= 100;
    }

    if (participantId) {
      const foundParticipant = await this.projectsRepository.findParticipantById(participantId);
      if (!foundParticipant) {
        throw new HttpException("Não existe um aluno com esse ID", HttpStatus.NOT_FOUND);
      }
    } else {
      if (email) {
        // Correção: forçar toLowerCase para evitar erros de case sensitivity na procura
        const foundParticipant = await this.projectsRepository.findParticipantByEmail(email.toLowerCase());
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

    // Correção: Utilização de `.some()` é mais performático que `.filter().length > 0`
    const existingCertificates = await this.projectsRepository.findCertificatesByParticipantId(participantId);
    const isDuplicate = existingCertificates.some(certificate =>
      editionId ? certificate.editionId === editionId : certificate.eventId === eventId,
    );

    if (isDuplicate) {
      throw new HttpException("Esse certificado já existe para este participante", HttpStatus.FORBIDDEN);
    }

    let certificate: ProjectCertificate;

    if (editionId) {
      const edition = await this.projectsRepository.findEditionById(editionId);
      if (!edition) {
        throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
      }

      certificate = await this.projectsRepository.createCertificate({
        attendance,
        editionId,
        participantId,
      });
    } else {
      const event = await this.projectsRepository.findEventById(eventId as string);
      if (!event) {
        throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
      }

      certificate = await this.projectsRepository.createCertificate({
        attendance, // Correção: A frequência deve ser registada mesmo se for um certificado de evento avulso
        editionId: event.editionId,
        eventId,
        participantId,
      });
    }

    return certificate;
  }
}