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
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });

    expect(participant).toHaveProperty("id");
  });

  it("should recognize when a participant is being created more than 1 time", async () => {
    await service.execute({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
    const participant = await service.execute({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });

    expect(participant).toHaveProperty("id");
  });

  it("should not be able to create a participant with same email", async () => {
    await service.execute({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9998",
      university: "Test University",
    });

    await expect(
      service.execute({
        birthDate: new Date(),
        course: "Test Course",
        email: "test@gmail.com",
        matricula: "20200015281",
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create a participant with same matricula", async () => {
    await service.execute({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9998",
      university: "Test University",
    });

    await expect(
      service.execute({
        birthDate: new Date(),
        course: "Test Course",
        email: "test2@gmail.com",
        matricula: "20200015280",
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create a participant with same phone number", async () => {
    await service.execute({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });

    await expect(
      service.execute({
        birthDate: new Date(),
        course: "Test Course",
        email: "test2@gmail.com",
        matricula: "20200015281",
        name: "Test",
        phoneNumber: "+55 83 99999-9999",
        university: "Test University",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should create external participants (no matricula) without matching other externals", async () => {
    const external = {
      birthDate: new Date(),
      course: "ext",
      matricula: null,
      name: "External",
      university: "Externo",
    };
    const first = await service.execute({
      ...external,
      email: "ext1@gmail.com",
      phoneNumber: "+55 83 91111-1111",
    });
    const second = await service.execute({
      ...external,
      email: "ext2@gmail.com",
      phoneNumber: "+55 83 92222-2222",
    });

    expect(second.id).not.toBe(first.id);
  });

  it("should update an external participant's phone number", async () => {
    const external = {
      birthDate: new Date(),
      course: "ext",
      email: "ext1@gmail.com",
      matricula: null,
      name: "External",
      university: "Externo",
    };
    await service.execute({ ...external, email: "other@gmail.com", phoneNumber: "+55 83 93333-3333" });
    const first = await service.execute({ ...external, phoneNumber: "+55 83 91111-1111" });
    const updated = await service.execute({ ...external, phoneNumber: "+55 83 94444-4444" });

    expect(updated.id).toBe(first.id);
    expect(updated.phoneNumber).toBe("+55 83 94444-4444");
  });
});
