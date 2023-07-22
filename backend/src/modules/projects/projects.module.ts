import { MailProvider, MailProviderKeys, mailProviders } from "@hyoretsu/providers";
import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import ProjectsController from "./infra/http/controllers/projects.controller";
import PrismaProjectsRepository from "./infra/prisma/repositories/projects.repository";
import ProjectsRepository from "./repositories/projects.repository";
import CreateAttendance from "./services/CreateAttendance.service";
import CreateCertificate from "./services/CreateCertificate.service";
import CreateEdition from "./services/CreateEdition.service";
import CreateEditionCertificates from "./services/CreateEditionCertificates.service";
import CreateEvent from "./services/CreateEvent.service";
import CreateEventCertificates from "./services/CreateEventCertificates.service";
import CreateParticipant from "./services/CreateParticipant.service";
import CreateParticipation from "./services/CreateParticipation.service";
import CreateProject from "./services/CreateProject.service";
import CreateSpeaker from "./services/CreateSpeaker.service";
import FindLatestEdition from "./services/FindLatestEdition.service";
import FindParticipant from "./services/FindParticipant.service";
import ListAttendees from "./services/ListAttendees.service";
import ListEditions from "./services/ListEditions.service";
import ListEvents from "./services/ListEvents.service";
import ListParticipants from "./services/ListParticipants.service";
import ValidateCertificate from "./services/ValidateCertificate.service";

@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: MailProvider,
      useClass: mailProviders[process.env.MAIL_DRIVER as MailProviderKeys],
    },
    PrismaService,
    {
      provide: ProjectsRepository,
      useClass: PrismaProjectsRepository,
    },
    ...[
      CreateAttendance,
      CreateCertificate,
      CreateEdition,
      CreateEditionCertificates,
      CreateEvent,
      CreateEventCertificates,
      CreateParticipant,
      CreateParticipation,
      CreateProject,
      CreateSpeaker,
      FindLatestEdition,
      FindParticipant,
      ListAttendees,
      ListEditions,
      ListEvents,
      ListParticipants,
      ValidateCertificate,
    ],
  ],
})
export default class ProjectsModule {}
