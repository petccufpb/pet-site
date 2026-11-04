import { HttpException } from "@nestjs/common";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import DeleteEdition from "./DeleteEdition.service";

describe("DeleteEdition", () => {
  let fakeProjectsRepository: FakeProjectsRepository;
  let service: DeleteEdition;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new DeleteEdition(fakeProjectsRepository);
  });

  it("should be able to delete an edition", async () => {
    const { id: projectId } = await fakeProjectsRepository.createProject({
      title: "Test",
    });

    const edition = await fakeProjectsRepository.createEdition({
      projectId,
      date: new Date(),
      number: 1,
    });

    await service.execute(edition.id);

    const found = await fakeProjectsRepository.findEditionById(edition.id);
    expect(found).toBeNull();
  });

  it("should not be able to delete a non-existing edition", async () => {
    await expect(service.execute("non-existing-id")).rejects.toBeInstanceOf(HttpException);
  });
});
