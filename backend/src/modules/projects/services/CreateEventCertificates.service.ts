import { MailProvider } from "@hyoretsu/providers";
import { sleep } from "@hyoretsu/utils";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

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

    const emailWhitelist: string[] = [];

    if (emailWhitelist.length === 0) {
      const existingCertificates = await this.projectsRepository.findCertificatesByEventId(eventId);
      const existingParticipants = existingCertificates.map(({ participantId }) => participantId);

      await this.projectsRepository.createCertificates(
        certificateInfo.filter(({ participantId }) => !existingParticipants.includes(participantId)),
      );
    }

    const certificates = await this.projectsRepository.findCertificatesByEventId(eventId);

    const participants = await this.projectsRepository.findParticipants(
      certificates.map(({ participantId }) => participantId),
    );

    const eventTitle = `${existingEvent.type === "minicurso" ? "do minicurso" : "do(a)"} "${
      existingEvent.name
    }"`;

    for (const participant of participants) {
      if (emailWhitelist.length > 0 && !emailWhitelist.includes(participant.email)) {
        continue;
      }

      await this.mailProvider.sendMail({
        to: participant.email,
        subject: `Certificado ${eventTitle}`,
        body: `Olá!<br/><br/>Estamos passando para informar que seu certificado ${eventTitle} já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${eventId}?event=true&participantId=${participant.id}`,
      });

      await sleep(1000);
    }

    return certificates;
  }
}
