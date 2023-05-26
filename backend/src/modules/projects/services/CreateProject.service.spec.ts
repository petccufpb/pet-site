import { HttpException } from "@nestjs/common";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateProject from "./CreateProject.service";

describe("CreateProject", () => {
  let service: CreateProject;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateProject(fakeProjectsRepository);
  });

  it("should be able to create a project", async () => {
    const project = await service.execute({
      title: "Test",
      about: "Anything",
      logoUrl: "http://localhost:3333/files/test.png",
    });

    expect(project).toHaveProperty("id");
  });

  it("should be able to create a project without about/logoUrl", async () => {
    const project = await service.execute({
      title: "Test",
    });

    expect(project).toHaveProperty("id");
  });

  it("should not be able to create two projects with the same title", async () => {
    await service.execute({
      title: "Test",
    });

    await expect(
      service.execute({
        title: "Test",
      }),
    ).rejects.toThrowError(HttpException);
  });
});
