import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateSpeaker from "./CreateSpeaker.service";

describe("CreateSpeaker", () => {
  let service: CreateSpeaker;

  beforeEach(() => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateSpeaker(fakeProjectsRepository);
  });

  it("should create a new speaker", async () => {
    const speaker = await service.execute({
      about: "",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });

    expect(speaker).toHaveProperty("id");
  });

  it("should create a new speaker with a GDrive link", async () => {
    const speaker = await service.execute({
      about: "",
      name: "Test Speaker",
      photoUrl: "https://drive.google.com/file/d/testId123/view?usp=drive_link",
    });

    expect(speaker).toHaveProperty("photoUrl", "https://drive.google.com/uc?id=testId123");
  });
});
