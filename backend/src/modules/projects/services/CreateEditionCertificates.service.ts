import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectCertificate } from "@prisma/client";

import ProjectsRepository, { CertificateInfo } from "../repositories/projects.repository";

@Injectable()
export default class CreateEditionCertificates {
  constructor(private projectsRepository: ProjectsRepository) {}

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
      // Todas as palestras
      for (const event of mainEvents) {
        const attendance = event.attendees.find(attendance => attendance.participantId === participantId);

        if (!attendance) {
          continue outerLoop;
        }
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

    return certificates;
  }
}
