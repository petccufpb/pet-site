import { MailProvider } from "@hyoretsu/providers";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ProjectParticipant, ProjectParticipation } from "@prisma/client";
import { isAfter } from "date-fns";

import CreateParticipationDTO from "../dtos/CreateParticipation.dto";
import ProjectsRepository, { FindParticipationDTO } from "../repositories/projects.repository";

@Injectable()
export default class CreateParticipation {
  constructor(private mailProvider: MailProvider, private projectsRepository: ProjectsRepository) {}

  public async execute({
    email,
    editionId,
    eventId,
    matricula,
    participantId,
  }: CreateParticipationDTO): Promise<ProjectParticipation> {
    let foundParticipant: ProjectParticipant | null;
    let title: string;

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

    let payload: FindParticipationDTO;

    if (eventId) {
      const event = await this.projectsRepository.findEventById(eventId);
      if (!event) {
        throw new HttpException("Esse evento não existe", HttpStatus.NOT_FOUND);
      }

      if (event.type !== "minicurso") {
        throw new HttpException("Você não precisa se inscrever nesse evento", HttpStatus.OK);
      }

      if (event.capacity && event.participants.length >= event.capacity + event.extraCapacity) {
        throw new HttpException("Infelizmente as vagas para este evento esgotaram", 400);
      }

      if (isAfter(new Date(), new Date(event.startTime))) {
        throw new HttpException("Esse evento já começou/terminou", 400);
      }

      ({ editionId } = event);
      title = event.name;

      const allEventParticipations = await this.projectsRepository.findEventParticipationsByEdition(
        editionId,
      );

      const participatingInEvent = allEventParticipations.find(
        participation => participation.participantId === participantId,
      );
      if (participatingInEvent && !event.allowMultiple) {
        throw new HttpException("Você só pode participar de um evento por edição", HttpStatus.FORBIDDEN);
      }

      const editionParticipation = await this.projectsRepository.findParticipation({
        editionId: editionId,
        participantId,
      });
      if (!editionParticipation) {
        throw new HttpException(
          "Você deve estar inscrito na edição correspondente para participar de um evento",
          HttpStatus.FORBIDDEN,
        );
      }

      payload = {
        eventId,
        participantId,
      };
    } else if (editionId) {
      const edition = await this.projectsRepository.findEditionById(editionId as string);
      if (!edition) {
        throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
      }

      const project = await this.projectsRepository.findProjectById(edition.projectId);

      title = edition.name || `${edition.number}ª edição do(a) ${project!.title}`;

      payload = {
        editionId,
        participantId,
      };
    } else {
      throw new HttpException("", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const existingParticipation = await this.projectsRepository.findParticipation(payload);
    if (existingParticipation) {
      throw new HttpException("Você já se inscreveu nesse evento", HttpStatus.FORBIDDEN);
    }

    const participation = await this.projectsRepository.createParticipation(payload);

    if (eventId) {
      await this.mailProvider.sendMail({
        to: foundParticipant.email as string,
        subject: `Confirmação de inscrição em minicurso`,
        body: `Olá estudante,\n\nSua inscrição no minicurso ${title} foi realizada com sucesso.\n\nAproveite!`,
      });
    } else {
      await this.mailProvider.sendMail({
        to: foundParticipant.email as string,
        subject: `Confirmação de inscrição na ${title}`,
        body: `Olá estudante,\n\nSua inscrição na ${title} foi realizada com sucesso.\n\nAproveite!`,
      });
    }

    return participation;
  }
}
