import { HttpException } from "@nestjs/common";
import { Project, ProjectEdition } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import FindLatestEdition from "./FindLatestEdition.service";

describe("FindLatestEdition", () => {
  let fakeProjectsRepository: FakeProjectsRepository;
  let latestEdition: ProjectEdition;
  let project: Project;
  let service: FindLatestEdition;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new FindLatestEdition(fakeProjectsRepository);

    project = await fakeProjectsRepository.createProject({
      title: "Test",
    });
    await fakeProjectsRepository.createEdition({
      projectId: project.id,
      date: new Date(),
      number: 1,
    });
    latestEdition = await fakeProjectsRepository.createEdition({
      projectId: project.id,
      date: new Date(),
      number: 2,
    });
  });

  it("should be able to find the latest edition", async () => {
    const edition = await service.execute({
      projectTitle: project.title,
    });

    expect(edition).toHaveProperty("id", latestEdition.id);
  });

  it("should not be able to find the latest edition of a non-existent project", async () => {
    await expect(
      service.execute({
        projectTitle: "Fake Project Title",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
