import { HttpException } from "@nestjs/common";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateEdition from "./CreateEdition.service";

describe("CreateEdition", () => {
  let fakeProjectsRepository: FakeProjectsRepository;
  let service: CreateEdition;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateEdition(fakeProjectsRepository);
  });

  it("should be able to create an edition", async () => {
    const { id: projectId } = await fakeProjectsRepository.createProject({
      title: "Test",
    });

    const edition = await service.execute({
      projectId,
      date: new Date(),
      number: 1,
    });

    expect(edition).toHaveProperty("id");
  });

  it("should be able to create an edition", async () => {
    const { id: projectId } = await fakeProjectsRepository.createProject({
      title: "Test",
    });

    await service.execute({
      projectId,
      date: new Date(),
      number: 1,
    });

    await expect(
      service.execute({
        projectId,
        date: new Date(),
        number: 1,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
