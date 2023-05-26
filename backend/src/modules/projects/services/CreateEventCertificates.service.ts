import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import CreateCertificatesDTO from "../dtos/CreateCertificates.dto";
import ProjectsRepository, { CertificateInfo } from "../repositories/projects.repository";

@Injectable()
export default class CreateEventCertificates {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    eventId,
  }: Required<CreateCertificatesDTO>): Promise<ProjectCertificate[]> {
    const existingEvent = await this.projectsRepository.findEventById(eventId);
    if (!existingEvent) {
      throw new HttpException("This event does not exist", HttpStatus.NOT_FOUND);
    }

    const participations = await this.projectsRepository.findParticipationsByEvent(eventId);

    const certificateInfo: CertificateInfo[] = [];
    for (const { participantId } of participations) {
      const attendance = await this.projectsRepository.findAttendance({
        eventId,
        participantId,
      });

      if (!attendance) {
        continue;
      }

      certificateInfo.push({
        editionId,
        eventId,
        participantId,
      });
    }

    await this.projectsRepository.createCertificates(certificateInfo);

    const certificates = await this.projectsRepository.findCertificatesByEventId(eventId);

    return certificates;
  }
}
