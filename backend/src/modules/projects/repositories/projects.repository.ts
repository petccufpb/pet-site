import { Project } from "@prisma/client";

import { CreateProjectDTO } from "../dtos/CreateProject.dto";

export abstract class ProjectsRepository {
  abstract create(data: CreateProjectDTO): Promise<Project>;
  abstract findByTitle(title: string): Promise<Project | null>;
}
