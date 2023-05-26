import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import ProjectsRepository, {
  CertificateInfo,
  CompleteProjectEdition,
} from "../repositories/projects.repository";

@Injectable()
export default class CreateEditionCertificates {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(editionId: string): Promise<ProjectCertificate[]> {
    const existingEdition = await this.projectsRepository.findEditionById(editionId);
    if (!existingEdition) {
      throw new HttpException("This edition does not exist", HttpStatus.NOT_FOUND);
    }

    const { events } = (await this.projectsRepository.findEditionById(editionId)) as CompleteProjectEdition;

    const certificateInfo: CertificateInfo[] = [];
    const mainEvents = events.filter(event => event.type === "main");
    const participations = await this.projectsRepository.findParticipationsByEdition(editionId);

    outerLoop: for (const { participantId } of participations) {
      for (const event of mainEvents) {
        const attendance = await this.projectsRepository.findAttendance({
          eventId: event.id,
          participantId,
        });

        if (!attendance) {
          continue outerLoop;
        }
      }

      certificateInfo.push({
        editionId,
        participantId,
      });
    }

    await this.projectsRepository.createCertificates(certificateInfo);

    const certificates = await this.projectsRepository.findCertificatesByEditionId(editionId);

    return certificates;
  }
}
