import { MailProvider } from "@hyoretsu/providers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Project, ProjectCertificate, ProjectParticipant } from "@prisma/client";

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

    outerLoop: for (const { participantId } of participations) {
      // Contagem de palestras
      let totalAttendances = 0;

      for (const event of mainEvents) {
        const attendance = event.attendees.find(attendance => attendance.participantId === participantId);
        if (attendance) {
          totalAttendances += 1;
        }
      }

      const attendanceRatio = totalAttendances / mainEvents.length;
      if (attendanceRatio * 100 < existingEdition.minimumAttendance) {
        continue outerLoop;
      }

      // 1 minicurso por SDC
      for (const [index, minicurso] of minicursos.entries()) {
        const attendance = minicurso.attendees.find(attendance => attendance.participantId === participantId);

        if (attendance) {
          break;
        }

        if (index === minicursos.length - 1) {
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
        editionId,
        participantId,
      });
    }

    await this.projectsRepository.createCertificates(certificateInfo);

    const certificates = await this.projectsRepository.findCertificatesByEditionId(editionId);

    for (const { participantId } of certificates) {
      const participant = (await this.projectsRepository.findParticipantById(
        participantId,
      )) as ProjectParticipant;

      let project: Project;
      if (!existingEdition.name) {
        project = (await this.projectsRepository.findProjectById(existingEdition.projectId)) as Project;
      }

      const certificateTitle =
        existingEdition.name || `${existingEdition.number}ª edição do(a) ${project!.title}`;

      await this.mailProvider.sendMail({
        to: participant.email,
        subject: `Certificado do(a) ${certificateTitle}`,
        body: `Olá!<br/><br/>Estamos passando para informar que seu certificado do(a) ${certificateTitle} já está disponível.<br/><br/>Você pode acessá-lo em: ${process.env.WEB_URL}/sdc/certificados/${editionId}?participantId=${participantId}`,
      });
    }

    return certificates;
  }
}
