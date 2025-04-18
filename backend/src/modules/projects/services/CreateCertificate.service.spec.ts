import { HttpException } from "@nestjs/common";
import { ProjectEdition, ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateCertificate from "./CreateCertificate.service";

describe("CreateCertificate", () => {
  let edition: ProjectEdition;
  let event: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let participant: ProjectParticipant;
  let service: CreateCertificate;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateCertificate(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
    edition = await fakeProjectsRepository.createEdition({ date: new Date(), number: 1, projectId });
    const { id: speakerId } = await fakeProjectsRepository.createSpeaker({
      about: "",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
    event = await fakeProjectsRepository.createEvent({
      about: "",
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "main",
    });
    participant = await fakeProjectsRepository.createParticipant({
      birthDate: new Date(),
      course: "Test Course",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "Test University",
    });
    await fakeProjectsRepository.createParticipation({
      editionId: edition.id,
      participantId: participant.id,
    });
    await fakeProjectsRepository.createParticipation({
      eventId: event.id,
      participantId: participant.id,
    });
  });

  it("should create a certificate using ID", async () => {
    const editionCertificate = await service.execute({
      editionId: edition.id,
      participantId: participant.id,
    });

    const eventCertificate = await service.execute({
      eventId: event.id,
      participantId: participant.id,
    });

    expect(editionCertificate).toHaveProperty("id");
    expect(eventCertificate).toHaveProperty("id");
  });

  it("should create a certificate using email", async () => {
    const editionCertificate = await service.execute({
      editionId: edition.id,
      email: participant.email,
    });

    const eventCertificate = await service.execute({
      email: participant.email,
      eventId: event.id,
    });

    expect(editionCertificate).toHaveProperty("id");
    expect(eventCertificate).toHaveProperty("id");
  });

  it("should create a certificate using matricula", async () => {
    const editionCertificate = await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    const eventCertificate = await service.execute({
      eventId: event.id,
      matricula: participant.matricula,
    });

    expect(editionCertificate).toHaveProperty("id");
    expect(eventCertificate).toHaveProperty("id");
  });

  it("should not allow creating the same certificate twice", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    await expect(
      service.execute({
        editionId: edition.id,
        matricula: participant.matricula,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create a certificate using non-registered email/ID/matricula", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
        participantId: "fake-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        editionId: edition.id,
        email: "fake@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: event.id,
        matricula: "20200015281",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create a certificate for a non-existent edition/event", async () => {
    await expect(
      service.execute({
        editionId: "fake-edition-id",
        matricula: participant.matricula,
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        eventId: "fake-event-id",
        matricula: participant.matricula,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create a certificate without email/ID/matricula", async () => {
    await expect(
      service.execute({
        eventId: event.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
