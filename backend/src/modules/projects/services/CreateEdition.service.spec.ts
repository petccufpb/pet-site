import { FakeProjectsRepository } from "../repositories/fakes/projects.repository";
import { CreateEdition } from "./CreateEdition.service";

describe("CreateProject", () => {
  let fakeProjectsRepository: FakeProjectsRepository;
  let service: CreateEdition;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateEdition(fakeProjectsRepository);
  });

  it("should successfully create an edition", async () => {
    const { id: projectId } = await fakeProjectsRepository.create({
      title: "Test",
    });

    const edition = await service.execute({
      projectId,
      number: 1,
    });

    expect(edition).toHaveProperty("id");
  });
});
