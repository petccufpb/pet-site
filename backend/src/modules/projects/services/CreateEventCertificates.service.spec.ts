import { MailProvider } from "@hyoretsu/providers";
import { HttpException } from "@nestjs/common";
import { ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import CreateEventCertificates from "./CreateEventCertificates.service";

describe("CreateEventCertificates", () => {
  let event: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let participant: ProjectParticipant;
  let service: CreateEventCertificates;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new CreateEventCertificates(
      {
        sendMail: async () => {},
      } as MailProvider,
      fakeProjectsRepository,
    );

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
    const edition = await fakeProjectsRepository.createEdition({ date: new Date(), number: 1, projectId });
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

  it("should be able to create certificates for an event", async () => {
    await fakeProjectsRepository.createAttendance({
      eventId: event.id,
      participantId: participant.id,
    });

    const certificates = await service.execute(event.id);

    expect(certificates).toHaveLength(1);
  });

  it("should not be able to create certificates for a participant that does not have attendance", async () => {
    const certificates = await service.execute(event.id);

    expect(certificates).toHaveLength(0);
  });

  it("should not be able to create certificates for a non-existent event", async () => {
    await expect(service.execute("fake-event-id")).rejects.toBeInstanceOf(HttpException);
  });
});
