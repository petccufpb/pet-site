import { Injectable } from "@nestjs/common";
import { Project } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
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

  public async findByTitle(title: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({ where: { title } });

    return project;
  }
}
