import { HttpException } from "@nestjs/common";
import { ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateAttendance from "./CreateAttendance.service";

describe("CreateAttendance", () => {
  let event: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let minicurso: ProjectEvent;
  let palestra: ProjectEvent;
  let participant: ProjectParticipant;
  let randomEvent: ProjectEvent;
  let service: CreateAttendance;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateAttendance(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
    const { id: editionId } = await fakeProjectsRepository.createEdition({
      date: new Date(),
      number: 1,
      projectId,
    });
    const { id: speakerId } = await fakeProjectsRepository.createSpeaker({
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
    event = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "main",
    });
    minicurso = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "minicurso",
    });
    palestra = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "palestra",
    });
    randomEvent = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: null,
    });
    participant = await fakeProjectsRepository.createParticipant({
      age: 1,
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
  });

  it("should be able to create an attendance using ID", async () => {
    await fakeProjectsRepository.createParticipation({
      eventId: event.id,
      participantId: participant.id,
    });

    const attendance = await service.execute({
      eventId: event.id,
      participantId: participant.id,
    });

    expect(attendance).toHaveProperty("id");
  });

  it("should be able to create an attendance using email", async () => {
    await fakeProjectsRepository.createParticipation({
      eventId: event.id,
      participantId: participant.id,
    });

    const attendance = await service.execute({
      eventId: event.id,
      email: "test@gmail.com",
    });

    expect(attendance).toHaveProperty("id");
  });

  it("should be able to create an attendance using matricula", async () => {
    await fakeProjectsRepository.createParticipation({
      eventId: event.id,
      participantId: participant.id,
    });

    const attendance = await service.execute({
      eventId: event.id,
      matricula: "20200015280",
    });

    expect(attendance).toHaveProperty("id");
  });

  it("should not be able to create an attendance without participating in a minicurso", async () => {
    await expect(
      service.execute({
        eventId: minicurso.id,
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not need to create an attendance for random events or palestras", async () => {
    await expect(
      service.execute({
        eventId: palestra.id,
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: randomEvent.id,
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create an attendance for a non-existent participant", async () => {
    await expect(
      service.execute({
        eventId: event.id,
        participantId: "fake-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: event.id,
        email: "test2@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: event.id,
        matricula: "20200015281",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create an attendance for a non-existent event", async () => {
    await expect(
      service.execute({
        eventId: "fake-event-id",
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create an attendance without email/ID/matricula", async () => {
    await expect(
      service.execute({
        eventId: event.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to create the same attendance 2 times", async () => {
    await fakeProjectsRepository.createParticipation({
      eventId: event.id,
      participantId: participant.id,
    });

    await service.execute({
      eventId: event.id,
      matricula: "20200015280",
    });

    await expect(
      service.execute({
        eventId: event.id,
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
