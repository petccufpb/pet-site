import { HttpException } from "@nestjs/common";
import { ProjectEdition, ProjectSpeaker } from "@prisma/client";

import { FakeProjectsRepository } from "../repositories/fakes/projects.repository";
import { CreateEvent } from "./CreateEvent.service";

describe("CreateEvent", () => {
  let edition: ProjectEdition;
  let service: CreateEvent;
  let speaker: ProjectSpeaker;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateEvent(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.create({ title: "Test Project" });
    edition = await fakeProjectsRepository.createEdition({ date: new Date(), number: 1, projectId });
    speaker = await fakeProjectsRepository.createSpeaker({
      email: "test@gmail.com",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
  });

  it("should not be able to create an event without an edition", async () => {
    await expect(
      service.execute({
        editionId: "fail-id",
        endTime: new Date(),
        location: "Test Room",
        name: "Test Event",
        onSite: true,
        speakerId: speaker.id,
        startTime: new Date(),
        type: "main",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create an event before the edition's start date", async () => {
    const startTime = new Date(edition.date);
    startTime.setDate(edition.date.getDate() - 1);

    await expect(
      service.execute({
        editionId: edition.id,
        endTime: new Date(),
        location: "Test Room",
        name: "Test Event",
        onSite: true,
        speakerId: speaker.id,
        startTime,
        type: "main",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create an event that ends before it starts", async () => {
    const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() - 1);

    await expect(
      service.execute({
        editionId: edition.id,
        endTime,
        location: "Test Room",
        name: "Test Event",
        onSite: true,
        speakerId: speaker.id,
        startTime,
        type: "main",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to create an on-site event", async () => {
    const event = await service.execute({
      capacity: 100,
      editionId: edition.id,
      endTime: new Date(),
      location: "Test Room",
      name: "Test Event",
      onSite: true,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "main",
    });

    expect(event).toHaveProperty("id");
  });

  it("should be able to create an on-site event without capacity", async () => {
    const event = await service.execute({
      editionId: edition.id,
      endTime: new Date(),
      location: "Test Room",
      name: "Test Event",
      onSite: true,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "main",
    });

    expect(event).toHaveProperty("id");
  });

  it("should not be able to create an on-site event without location", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
        endTime: new Date(),
        name: "Test Event",
        onSite: true,
        speakerId: speaker.id,
        startTime: new Date(),
        type: "main",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to create an online event", async () => {
    const event = await service.execute({
      capacity: 50,
      editionId: edition.id,
      endTime: new Date(),
      location: "https://meet.google.com/aaa-aaaa-aaa",
      name: "Test Event",
      onSite: false,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "side",
    });

    expect(event).toHaveProperty("id");
  });

  it("should be able to create an online event without capacity", async () => {
    const event = await service.execute({
      editionId: edition.id,
      endTime: new Date(),
      location: "https://meet.google.com/aaa-aaaa-aaa",
      name: "Test Event",
      onSite: false,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "side",
    });

    expect(event).toHaveProperty("id");
  });

  it("should be able to create an online event without location and capacity", async () => {
    const event = await service.execute({
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Event",
      onSite: false,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "side",
    });

    expect(event).toHaveProperty("id");
  });

  it("should not be able to create two events at the same time and location", async () => {
    await service.execute({
      editionId: edition.id,
      endTime: new Date(),
      location: "Test Room",
      name: "Test Event",
      onSite: true,
      speakerId: speaker.id,
      startTime: new Date(),
      type: "main",
    });

    await expect(
      service.execute({
        editionId: edition.id,
        endTime: new Date(),
        location: "Test Room",
        name: "Test Event",
        onSite: true,
        speakerId: speaker.id,
        startTime: new Date(),
        type: "main",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
