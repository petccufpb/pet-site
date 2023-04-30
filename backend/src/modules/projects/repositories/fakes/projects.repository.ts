import { Injectable } from "@nestjs/common";
import { Project } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateProjectDTO } from "@modules/projects/dtos/CreateProject.dto";

import { ProjectsRepository } from "../projects.repository";

@Injectable()
export class FakeProjectsRepository implements ProjectsRepository {
  private projects: Project[] = [];

  async create({ about, logoUrl, ...data }: CreateProjectDTO): Promise<Project> {
    const project = {
      ...data,
      about: about || "",
      logoUrl: logoUrl || "",
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.projects.push(project);

    return project;
  }

  async findByTitle(title: string): Promise<Project | null> {
    const project = this.projects.find(project => project.title === title) as Project | null;

    return project;
  }
}
