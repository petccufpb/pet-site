import { MailProvider } from "@hyoretsu/providers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate, ProjectParticipant } from "@prisma/client";

import ProjectsRepository, { CertificateInfo } from "../repositories/projects.repository";

@Injectable()
export default class CreateEventCertificates {
  constructor(private mailProvider: MailProvider, private projectsRepository: ProjectsRepository) {}

  public async execute(eventId: string): Promise<ProjectCertificate[]> {
    const existingEvent = await this.projectsRepository.findEventById(eventId);
    if (!existingEvent) {
      throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
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
        eventId,
        participantId,
      });
    }

    await this.projectsRepository.createCertificates(certificateInfo);

    const certificates = await this.projectsRepository.findCertificatesByEventId(eventId);

    for (const { participantId } of certificates) {
      const participant = (await this.projectsRepository.findParticipantById(
        participantId,
      )) as ProjectParticipant;

      await this.mailProvider.sendMail({
        to: participant.email,
        subject: `Certificado do minicurso ${existingEvent.name}`,
        body: `Olá!<br/><br/>Estamos passando para informar que seu certificado do minicurso ${existingEvent.name} já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${eventId}?participantId=${participantId}`,
      });
    }

    return certificates;
  }
}
