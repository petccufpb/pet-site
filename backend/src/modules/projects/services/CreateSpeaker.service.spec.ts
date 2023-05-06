import { HttpException } from "@nestjs/common";

import { FakeProjectsRepository } from "../repositories/fakes/projects.repository";
import { CreateSpeaker } from "./CreateSpeaker.service";

describe("CreateSpeaker", () => {
  let service: CreateSpeaker;

  beforeEach(() => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateSpeaker(fakeProjectsRepository);
  });

  it("should be able to create a new speaker", async () => {
    const speaker = await service.execute({
      email: "test@gmail.com",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });

    expect(speaker).toHaveProperty("id");
  });

  it("should not be able to create two speakers with the same email", async () => {
    await service.execute({
      email: "test@gmail.com",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });

    await expect(
      service.execute({
        email: "test@gmail.com",
        name: "Test Speaker",
        photoUrl: "http://test.com/photo.png",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
