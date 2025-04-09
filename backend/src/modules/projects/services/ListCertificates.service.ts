import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import ListCertificatesDTO from "../dtos/ListCertificates.dto";
import ProjectsRepository, { CompleteProjectCertificate } from "../repositories/projects.repository";

@Injectable()
export default class ListCertificates {
  constructor(private readonly prisma: PrismaService, private projectsRepository: ProjectsRepository) {}

  public async execute({
    editionId,
    eventId,
    participantId,
    speakerId,
  }: ListCertificatesDTO): Promise<CompleteProjectCertificate[]> {
    let certificates: CompleteProjectCertificate[] = [];

    if (editionId) {
      certificates = await this.projectsRepository.findCertificatesByEditionId(editionId);

      const events = await this.projectsRepository.findEventsByEdition(editionId);
      for (const event of events) {
        const eventCertificates = await this.projectsRepository.findCertificatesByEventId(event.id);

        if (eventCertificates.length > 0) {
          certificates.concat(eventCertificates);
        }
      }

      if (participantId) {
        certificates = certificates.filter(certificate => certificate.participantId === participantId);
      }
    } else if (eventId) {
      if (speakerId) {
        const event = await this.prisma.projectEvent.findUnique({
          where: { id: eventId },
        });

        const certificate = (await this.prisma.projectCertificate.findFirst({
          where: {
            editionId: event?.editionId,
            speakerId,
          },
          include: {
            edition: {
              include: {
                certificateTemplate: {
                  where: {
                    speaker: true,
                  },
                },
              },
            },
            speaker: true,
          },
        })) as unknown as CompleteProjectCertificate;

        if (!certificate) {
          throw new HttpException("Esse certificado não existe", HttpStatus.NOT_FOUND);
        }

        // @ts-ignore
        certificate.event = { ...event, certificateTemplate: [] };

        certificates = [certificate];
      } else {
        certificates = await this.projectsRepository.findCertificatesByEventId(eventId);
      }

      if (participantId) {
        certificates = certificates.filter(certificate => certificate.participantId === participantId);
      } else if (speakerId) {
        certificates = certificates.filter(certificate => certificate.speakerId === speakerId);
      }
    } else if (participantId) {
      certificates = await this.projectsRepository.findCertificatesByParticipantId(participantId);
    } else {
      throw new HttpException(
        "Envie uma edição, evento ou participante para listar certificados",
        HttpStatus.BAD_REQUEST,
      );
    }

    return certificates;
  }
}
