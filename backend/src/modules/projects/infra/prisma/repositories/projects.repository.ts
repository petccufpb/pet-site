import { Injectable } from "@nestjs/common";
import { Project, ProjectEdition } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import { CreateEditionDTO } from "@modules/projects/dtos/CreateEdition.dto";
import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";
import { ProjectsRepository } from "@modules/projects/repositories/projects.repository";

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: CreateProjectDTO): Promise<Project> {
    const project = await this.prisma.project.create({
      data,
    });

    return project;
  }

  public async createEdition(data: CreateEditionDTO): Promise<ProjectEdition> {
    const edition = await this.prisma.projectEdition.create({
      data,
    });

    return edition;
  }

  public async findByTitle(title: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({ where: { title } });

    return project;
  }
}
