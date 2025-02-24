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

    const attendances = await this.projectsRepository.findAttendancesByEvent(eventId);

    const certificateInfo: CertificateInfo[] = attendances.map(({ participantId }) => ({
      editionId: existingEvent.editionId,
      eventId,
      participantId,
    }));

    await this.projectsRepository.createCertificates(certificateInfo);

    const certificates = await this.projectsRepository.findCertificatesByEventId(eventId);

    for (const { participantId } of certificates) {
      const participant = (await this.projectsRepository.findParticipantById(
        participantId,
      )) as ProjectParticipant;

      const eventTitle = `existingEvent.type === "minicurso" ? "do minicurso" : "do(a)" ${existingEvent.name}`;

      await this.mailProvider.sendMail({
        to: participant.email,
        subject: `Certificado ${eventTitle}`,
        body: `Olá!<br/><br/>Estamos passando para informar que seu certificado ${eventTitle} já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${eventId}?event=true&participantId=${participantId}`,
      });
    }

    return certificates;
  }
}
