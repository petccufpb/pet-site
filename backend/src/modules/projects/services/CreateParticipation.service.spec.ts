import { MailProvider } from "@hyoretsu/providers";
import { HttpException } from "@nestjs/common";
import { ProjectEdition, ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateParticipation from "./CreateParticipation.service";

describe("CreateParticipation", () => {
  let edition: ProjectEdition;
  let event: ProjectEvent;
  let event2: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let participant: ProjectParticipant;
  let participant2: ProjectParticipant;
  let randomEvent: ProjectEvent;
  let service: CreateParticipation;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateParticipation(
      {
        sendMail: async () => {},
      } as MailProvider,
      fakeProjectsRepository,
    );

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
      type: "minicurso",
    });
    event2 = await fakeProjectsRepository.createEvent({
      about: "",
      capacity: 1,
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Minicurso",
      speakerId,
      startTime: new Date(),
      type: "minicurso",
    });
    randomEvent = await fakeProjectsRepository.createEvent({
      about: "",
      editionId: edition.id,
      endTime: new Date(),
      name: "Test Event 2",
      speakerId,
      startTime: new Date(),
      type: null,
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
    participant2 = await fakeProjectsRepository.createParticipant({
      birthDate: new Date(),
      course: "Test Course",
      email: "test2@gmail.com",
      matricula: "20200015281",
      name: "Test 2",
      phoneNumber: "+55 83 99999-9998",
      university: "Test University",
    });
  });

  it("should create a participation using ID", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      participantId: participant.id,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should create a participation using email", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      email: participant.email,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should create a participation using matricula", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should not create a participation for a non-existent participant", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
        participantId: "fake-id",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        editionId: edition.id,
        email: "test3@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        editionId: edition.id,
        matricula: "20200015282",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should create a participation without email/ID/matricula", async () => {
    await expect(
      service.execute({
        editionId: edition.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should create an edition participation", async () => {
    const participation = await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should create an event participation", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    const participation = await service.execute({
      eventId: event.id,
      matricula: participant.matricula,
    });

    expect(participation).toHaveProperty("id");
  });

  it("should not create a participation for a non-existent edition", async () => {
    await expect(
      service.execute({
        editionId: "fake-edition-id",
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create a participation for a non-existent event", async () => {
    await expect(
      service.execute({
        eventId: "fake-event-id",
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create a participation for an event without an edition participation", async () => {
    await expect(
      service.execute({
        eventId: event.id,
        matricula: "20200015280",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not create the same participation 2 times", async () => {
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

    await service.execute({
      eventId: event.id,
      email: participant.email,
    });

    await expect(
      service.execute({
        eventId: event.id,
        email: participant.email,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not allow participating in a non-minicurso event", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    await expect(
      service.execute({
        eventId: randomEvent.id,
        email: participant.email,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not allow participating in 2 different events in the same edition", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });

    await service.execute({
      eventId: event.id,
      email: participant.email,
    });

    await expect(
      service.execute({
        eventId: event2.id,
        email: participant.email,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not allow participating in an event that's already full", async () => {
    await service.execute({
      editionId: edition.id,
      matricula: participant.matricula,
    });
    await service.execute({
      editionId: edition.id,
      matricula: participant2.matricula,
    });

    await service.execute({
      eventId: event2.id,
      email: participant.email,
    });

    await expect(
      service.execute({
        eventId: event2.id,
        email: participant2.email,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
