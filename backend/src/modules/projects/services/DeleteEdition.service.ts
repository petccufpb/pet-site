import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import ProjectsRepository from "../repositories/projects.repository";

@Injectable()
export default class DeleteEdition {
  constructor(private projectsRepository: ProjectsRepository) {}

  public async execute(id: string): Promise<void> {
    const edition = await this.projectsRepository.findEditionById(id);
    if (!edition) {
      throw new HttpException("Essa edição não existe", HttpStatus.NOT_FOUND);
    }

    await this.projectsRepository.deleteEdition(id);
  }
}
