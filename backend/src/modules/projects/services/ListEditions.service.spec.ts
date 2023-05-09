import { HttpException } from "@nestjs/common";
import { Project } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import ListEditions from "./ListEditions.service";

describe("ListEditions", () => {
  let project: Project;
  let service: ListEditions;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new ListEditions(fakeProjectsRepository);

    project = await fakeProjectsRepository.createProject({
      title: "Test",
    });
    await fakeProjectsRepository.createEdition({
      projectId: project.id,
      date: new Date(),
      number: 1,
    });
    await fakeProjectsRepository.createEdition({
      projectId: project.id,
      date: new Date(),
      number: 2,
    });
  });

  it("should be able to list all editions of a project", async () => {
    const editions = await service.execute({
      projectId: project.id,
    });

    expect(editions).toHaveLength(2);
  });
  it("should not be able to list the editions of a non-existent project", async () => {
    await expect(
      service.execute({
        projectId: "fake-project-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
