import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import ValidateCertificateDTO from "../dtos/ValidateCertificate.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class ValidateCertificate {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({ certificateId, email, matricula }: ValidateCertificateDTO): Promise<boolean> {
    let participantId: string;

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

    const certificate = await this.projectsRepository.findCertificateById(certificateId);
    if (!certificate) {
      throw new HttpException("Esse certificado não existe", HttpStatus.NOT_FOUND);
    }

    return certificate.participantId === participantId;
  }
}
