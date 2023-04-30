import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import ProjectsController from "./infra/http/controllers/projects.controller";
import { PrismaProjectsRepository } from "./infra/prisma/repositories/projects.repository";
import { ProjectsRepository } from "./repositories/projects.repository";
import { CreateProject } from "./services/CreateProject.service";

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: ProjectsRepository,
      useClass: PrismaProjectsRepository,
    },
    ...[CreateProject],
  ],
})
export class ProjectsModule {}
