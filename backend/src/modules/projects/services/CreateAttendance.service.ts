import { MailProvider } from "@hyoretsu/providers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectAttendance, ProjectParticipant } from "@prisma/client";

import CreateAttendanceDTO from "../dtos/CreateAttendance.dto";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class CreateAttendance {
  constructor(private mailProvider: MailProvider, private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    eventId,
    matricula,
    participantId,
  }: CreateAttendanceDTO): Promise<ProjectAttendance> {
    const event = await this.projectsRepository.findEventById(eventId);
    if (!event) {
      throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
    }

    if (!event.type || event.type === "palestra") {
      throw new HttpException("Você não precisa marcar frequência nesse evento", HttpStatus.OK);
    }

    let foundParticipant: ProjectParticipant | null;

    if (participantId) {
      foundParticipant = await this.projectsRepository.findParticipantById(participantId);
      if (!foundParticipant) {
        throw new HttpException("Não existe um aluno com esse ID", HttpStatus.NOT_FOUND);
      }
    } else {
      if (email) {
        foundParticipant = await this.projectsRepository.findParticipantByEmail(email);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com esse email", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else if (matricula) {
        foundParticipant = await this.projectsRepository.findParticipantByMatricula(matricula);
        if (!foundParticipant) {
          throw new HttpException("Não existe um aluno com essa matrícula", HttpStatus.NOT_FOUND);
        }

        participantId = foundParticipant.id;
      } else {
        throw new HttpException("Você deve enviar um email, matrícula ou ID", HttpStatus.BAD_REQUEST);
      }
    }

    if (event.type === "minicurso") {
      const participation = await this.projectsRepository.findParticipation({ eventId, participantId });
      if (!participation) {
        throw new HttpException(
          "Você deve estar participando em um evento para marcar frequência nele",
          HttpStatus.FORBIDDEN,
        );
      }
    }

    const payload = {
      eventId,
      participantId,
    };

    const existingAttendance = await this.projectsRepository.findAttendance(payload);
    if (existingAttendance) {
      throw new HttpException("Você já marcou frequência", HttpStatus.CONFLICT);
    }

    const attendance = await this.projectsRepository.createAttendance(payload);

    try {
      const edition = await this.projectsRepository.findEditionById(event.editionId);
      const project = await this.projectsRepository.findProjectById(edition!.projectId);

      await this.mailProvider.sendMail({
        to: foundParticipant!.email as string,
        subject: `Confirmação de frequência`,
        body: `Olá estudante!\n\nEstamos passando para avisar que sua frequência n${
          event.type === "minicurso" ? "o minicurso" : "a palestra"
        } ${event.name} foi realizada com sucesso.\n\nEspero que estejam gostando dessa edição d(a) ${
          project!.title
        }!`,
      });
    } catch (e) {
      console.log(e);
    }

    return attendance;
  }
}
