import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateSpeaker from "./CreateSpeaker.service";

describe("CreateSpeaker", () => {
  let service: CreateSpeaker;

  beforeEach(() => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateSpeaker(fakeProjectsRepository);
  });

  it("should be able to create a new speaker", async () => {
    const speaker = await service.execute({
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });

    expect(speaker).toHaveProperty("id");
  });
});
