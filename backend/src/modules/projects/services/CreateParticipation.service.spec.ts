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
    event = await fakeProjectsRepository.createEvent({
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Event",
      startTime: new Date(),
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

  it("should successfully create an edition participation", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      participantId: participant.id,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should successfully create an event participation", async () => {
    const participation = await service.execute({
      eventId: event.id,
      participantId: participant.id,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should not be able to create the same participation 2 times", async () => {
    await service.execute({
      editionId: edition.id,
      participantId: participant.id,
    });

    await expect(
      service.execute({
        editionId: edition.id,
        participantId: participant.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await service.execute({
      eventId: event.id,
      participantId: participant.id,
    });

    await expect(
      service.execute({
        eventId: event.id,
        participantId: participant.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
