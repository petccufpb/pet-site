import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import ListCertificatesDTO from "../dtos/ListCertificates.dto";
import ProjectsRepository, { CompleteProjectCertificate } from "../repositories/projects.repository";

@Injectable()
export default class ListCertificates {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    eventId,
    participantId,
  }: ListCertificatesDTO): Promise<CompleteProjectCertificate[]> {
    let certificates: CompleteProjectCertificate[] = [];

    if (editionId) {
      certificates = await this.projectsRepository.findCertificatesByEditionId(editionId);

      const events = await this.projectsRepository.findEventsByEdition(editionId);
      for (const event of events) {
        const eventCertificates = await this.projectsRepository.findCertificatesByEventId(event.id);

        if (eventCertificates.length > 0) {
          certificates.concat(eventCertificates);
        }
      }

      if (participantId) {
        certificates = certificates.filter(certificate => certificate.participantId === participantId);
      }
    } else if (eventId) {
      certificates = await this.projectsRepository.findCertificatesByEventId(eventId);
    } else if (participantId) {
      certificates = await this.projectsRepository.findCertificatesByParticipantId(participantId);
    } else {
      throw new HttpException(
        "Envie uma edição, evento ou participante para listar certificados",
        HttpStatus.BAD_REQUEST,
      );
    }

    return certificates;
  }
}
