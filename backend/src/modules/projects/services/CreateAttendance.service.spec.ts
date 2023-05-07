import { HttpException } from "@nestjs/common";
import { ProjectEvent } from "@prisma/client";

import { FakeProjectsRepository } from "../repositories/fakes/projects.repository";
import { CreateAttendance } from "./CreateAttendance.service";

describe("CreateAttendance", () => {
  let event: ProjectEvent;
  let service: CreateAttendance;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateAttendance(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.create({ title: "Test Project" });
    const { id: editionId } = await fakeProjectsRepository.createEdition({
      date: new Date(),
      number: 1,
      projectId,
    });
    const { id: speakerId } = await fakeProjectsRepository.createSpeaker({
      email: "test@gmail.com",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
    event = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "side",
    });
    await fakeProjectsRepository.createParticipant({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: 20200015280,
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
  });

  it("should be able to create an attendance with email", async () => {
    const attendance = await service.execute({
      eventId: event.id,
      email: "test@gmail.com",
    });

    expect(attendance).toHaveProperty("id");
  });

  it("should be able to create an attendance with matricula", async () => {
    const attendance = await service.execute({
      eventId: event.id,
      matricula: 20200015280,
    });

    expect(attendance).toHaveProperty("id");
  });

  it("should not be able to create an attendance for a non-existent participant", async () => {
    await expect(
      service.execute({
        eventId: event.id,
        email: "test2@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: event.id,
        matricula: 20200015281,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to create an attendance without email nor matricula", async () => {
    await expect(
      service.execute({
        eventId: event.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create the same attendance 2 times", async () => {
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
