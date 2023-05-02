import { Project, ProjectEdition } from "@prisma/client";

import { CreateEditionDTO } from "../dtos/CreateEdition.dto";
import { CreateProjectDTO } from "../dtos/CreateProject.dto";

export abstract class ProjectsRepository {
  abstract create(data: CreateProjectDTO): Promise<Project>;
  abstract createEdition(data: CreateEditionDTO): Promise<ProjectEdition>;
  abstract findByTitle(title: string): Promise<Project | null>;
}
