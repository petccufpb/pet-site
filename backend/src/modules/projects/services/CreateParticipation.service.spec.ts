import { HttpException } from "@nestjs/common";
import { ProjectEdition, ProjectEvent, ProjectParticipant } from "@prisma/client";

import { FakeProjectsRepository } from "../repositories/fakes/projects.repository";
import { CreateParticipation } from "./CreateParticipation.service";

describe("CreateParticipation", () => {
  let edition: ProjectEdition;
  let event: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let participant: ProjectParticipant;
  let service: CreateParticipation;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateParticipation(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.create({ title: "Test Project" });
    edition = await fakeProjectsRepository.createEdition({ date: new Date(), number: 1, projectId });
    const { id: speakerId } = await fakeProjectsRepository.createSpeaker({
      email: "test@gmail.com",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
    event = await fakeProjectsRepository.createEvent({
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "side",
    });
    participant = await fakeProjectsRepository.createParticipant({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
  });

  it("should be able to create a participation with email", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      email: "test@gmail.com",
    });

    expect(participation).toHaveProperty("id");
  });

  it("should be able to create a participation with matricula", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      matricula: 20200015280,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should not be able to create a participation for a non-existent participant", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
        email: "test2@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        editionId: edition.id,
        matricula: 20200015281,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to create a participation without email nor matricula", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to create an edition participation", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      matricula: 20200015280,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should be able to create an event participation", async () => {
    const participation = await service.execute({
      eventId: event.id,
      matricula: 20200015280,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should not be able to create the same participation 2 times", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: 20200015280,
    });

    await expect(
      service.execute({
        editionId: edition.id,
        matricula: 20200015280,
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await service.execute({
      eventId: event.id,
      matricula: 20200015280,
    });

    await expect(
      service.execute({
        eventId: event.id,
        matricula: 20200015280,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
