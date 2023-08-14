import { HttpException } from "@nestjs/common";
import { Project, ProjectEdition } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import ListEditions from "./ListEditions.service";

describe("ListEditions", () => {
  let edition1: ProjectEdition;
  let project: Project;
  let service: ListEditions;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new ListEditions(fakeProjectsRepository);

    project = await fakeProjectsRepository.createProject({
      title: "Test",
    });
    edition1 = await fakeProjectsRepository.createEdition({
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

  it("should list all editions of a project", async () => {
    const editions = await service.execute({
      projectId: project.id,
    });

    expect(editions).toHaveLength(2);
  });

  it("should show a specific edition", async () => {
    const editions = await service.execute({
      editionId: edition1.id,
    });

    expect(editions).toHaveLength(1);
  });

  it("should not show a non-existent edition", async () => {
    await expect(
      service.execute({
        editionId: "fake-edition-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not list anything without an editionId nor projectId", async () => {
    await expect(service.execute({})).rejects.toBeInstanceOf(HttpException);
  });

  it("should not list the editions of a non-existent project", async () => {
    await expect(
      service.execute({
        projectId: "fake-project-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
