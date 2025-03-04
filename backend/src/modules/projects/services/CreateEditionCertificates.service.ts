import { MailProvider } from "@hyoretsu/providers";
import { sleep } from "@hyoretsu/utils";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import ProjectsRepository, { CertificateInfo } from "../repositories/projects.repository";

@Injectable()
export default class CreateEditionCertificates {
  constructor(private mailProvider: MailProvider, private projectsRepository: ProjectsRepository) {}

  public async execute(editionId: string): Promise<ProjectCertificate[]> {
    const existingEdition = await this.projectsRepository.findEditionById(editionId);
    if (!existingEdition) {
      throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
    }

    const { events } = existingEdition;

    const certificateInfo: CertificateInfo[] = [];
    const mainEvents = events.filter(event => event.type === "main");
    const minicursos = events.filter(event => event.type === "minicurso");
    const participations = await this.projectsRepository.findParticipationsByEdition(editionId);

    // const sortedMinicursos = minicursos.reduce((obj, value) => {
    //   const arrKeys = Object.keys(obj);
    //   const sameDayStr = arrKeys.find(storedDate =>
    //     isSameDay(new Date(storedDate), new Date(value.startTime)),
    //   );

    //   return {
    //     ...obj,
    //     [sameDayStr || value.startTime.toString()]: [...(sameDayStr ? obj[sameDayStr] : []), value],
    //   };
    // }, {} as Record<string, CompleteProjectEvent[]>);

    let minicursoCount = 0;

    outerLoop: for (const { participantId } of participations) {
      // Contagem de palestras
      let totalAttendances = 0;

      for (const event of mainEvents) {
        const attendance = event.attendees.find(attendance => attendance.participantId === participantId);
        if (attendance) {
          totalAttendances += 1;
        }
      }

      const attendanceRatio = (totalAttendances / mainEvents.length) * 100;
      if (attendanceRatio < existingEdition.minimumAttendance) {
        continue outerLoop;
      }

      // 1 minicurso por SDC
      for (const [index, minicurso] of minicursos.entries()) {
        const attendance = minicurso.attendees.find(attendance => attendance.participantId === participantId);

        if (attendance) {
          break;
        }

        if (index === minicursos.length - 1) {
          minicursoCount += 1;
          continue outerLoop;
        }
      }

      // 1 minicurso por dia
      //   dayMinicursoLoop: for (const minicursosByDay of Object.values(sortedMinicursos)) {
      //     for (const minicurso of minicursosByDay) {
      //       const attendance = event.attendees.find(attendance => attendance.participantId === participantId);

      //       if (attendance) {
      //         continue dayMinicursoLoop;
      //       }
      //     }

      //     continue outerLoop;
      //   }

      certificateInfo.push({
        attendance: attendanceRatio,
        editionId,
        participantId,
      });
    }

    const emailWhitelist: string[] = [];

    if (emailWhitelist.length === 0) {
      await this.projectsRepository.createCertificates(certificateInfo);
    }

    const certificates = await this.projectsRepository.findCertificatesByEditionId(editionId);

    const participants = await this.projectsRepository.findParticipants(
      certificates.map(({ participantId }) => participantId),
    );

    let editionTitle: string;
    if (existingEdition.name) {
      editionTitle = existingEdition.name;
    } else {
      const project = await this.projectsRepository.findProjectById(existingEdition.projectId);

      editionTitle = `${existingEdition.number}ª edição do(a) ${project!.title}`;
    }

    for (const participant of participants) {
      if (emailWhitelist.length > 0 && !emailWhitelist.includes(participant.email)) {
        continue;
      }

      await this.mailProvider.sendMail({
        to: participant.email,
        subject: `Certificado do(a) ${editionTitle}`,
        body: `Olá!<br/><br/>Estamos passando para informar que seu certificado do(a) ${editionTitle} já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${editionId}?participantId=${participant.id}`,
      });

      await sleep(1000);
    }

    return certificates;
  }
}
