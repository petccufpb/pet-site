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
      throw new HttpException("You need to provide either an email or a matricula", HttpStatus.BAD_REQUEST);
    }

    const certificate = await this.projectsRepository.findCertificateById(certificateId);
    if (!certificate) {
      throw new HttpException("This certificate does not exist", HttpStatus.NOT_FOUND);
    }

    return certificate.participantId === participantId;
  }
}
