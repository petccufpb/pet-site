import { HttpException } from "@nestjs/common";
import { ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import FindParticipant from "./FindParticipant.service";

describe("FindParticipant", () => {
  let participant: ProjectParticipant;
  let service: FindParticipant;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new FindParticipant(fakeProjectsRepository);

    participant = await fakeProjectsRepository.createParticipant({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
  });

  it("should be able to find a participant using id", async () => {
    const foundParticipant = await service.execute({
      participantId: participant.id,
    });

    expect(foundParticipant).not.toBeNull();
  });

  it("should be able to find a participant using email", async () => {
    const foundParticipant = await service.execute({
      email: participant.email,
    });

    expect(foundParticipant).not.toBeNull();
  });

  it("should be able to find a participant using matricula", async () => {
    const foundParticipant = await service.execute({
      matricula: participant.matricula,
    });

    expect(foundParticipant).not.toBeNull();
  });

  it("should be able to find a participant using phone number", async () => {
    const foundParticipant = await service.execute({
      phoneNumber: participant.phoneNumber,
    });

    expect(foundParticipant).not.toBeNull();
  });

  it("should not be able to find a non-existent participant", async () => {
    const foundParticipant = await service.execute({
      participantId: "fakeId",
    });

    expect(foundParticipant).toBeNull();
  });
});
