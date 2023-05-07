import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import ProjectsController from "./infra/http/controllers/projects.controller";
import PrismaProjectsRepository from "./infra/prisma/repositories/projects.repository";
import ProjectsRepository from "./repositories/projects.repository";
import CreateAttendance from "./services/CreateAttendance.service";
import CreateEdition from "./services/CreateEdition.service";
import CreateEditionCertificates from "./services/CreateEditionCertificates.service";
import CreateEvent from "./services/CreateEvent.service";
import CreateEventCertificates from "./services/CreateEventCertificates.service";
import CreateParticipant from "./services/CreateParticipant.service";
import CreateParticipation from "./services/CreateParticipation.service";
import CreateProject from "./services/CreateProject.service";
import CreateSpeaker from "./services/CreateSpeaker.service";

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: ProjectsRepository,
      useClass: PrismaProjectsRepository,
    },
    ...[
      CreateAttendance,
      CreateEdition,
      CreateEditionCertificates,
      CreateEvent,
      CreateEventCertificates,
      CreateParticipant,
      CreateParticipation,
      CreateProject,
      CreateSpeaker,
    ],
  ],
})
export default class ProjectsModule {}
