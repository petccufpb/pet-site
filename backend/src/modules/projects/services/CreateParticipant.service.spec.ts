import { HttpException } from "@nestjs/common";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateParticipant from "./CreateParticipant.service";

describe("CreateParticipant", () => {
  let service: CreateParticipant;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateParticipant(fakeProjectsRepository);
  });

  it("should be able to create a participant", async () => {
    const participant = await service.execute({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });

    expect(participant).toHaveProperty("id");
  });

  it("should not be able to create a participant with same email", async () => {
    await service.execute({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9998",
      university: "Test University",
    });

    await expect(
      service.execute({
        age: 1,
        course: "Test Course",
        email: "test@gmail.com",
        matricula: 20200015281,
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create a participant with same matricula", async () => {
    await service.execute({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9998",
      university: "Test University",
    });

    await expect(
      service.execute({
        age: 1,
        course: "Test Course",
        email: "test2@gmail.com",
        matricula: 20200015280,
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create a participant with same phone number", async () => {
    await service.execute({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });

    await expect(
      service.execute({
        age: 1,
        course: "Test Course",
        email: "test2@gmail.com",
        matricula: 20200015281,
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
