import { HttpException } from "@nestjs/common";
import { ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import ListAttendees from "./ListAttendees.service";

describe("ListAttendees", () => {
  let editionId: string;
  let event: ProjectEvent;
  let event2: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let participant: ProjectParticipant;
  let participant2: ProjectParticipant;
  let service: ListAttendees;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new ListAttendees(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
    ({ id: editionId } = await fakeProjectsRepository.createEdition({
      date: new Date(),
      number: 1,
      projectId,
    }));
    const { id: speakerId } = await fakeProjectsRepository.createSpeaker({
      about: "",
      name: "Test Speaker",
      photoUrl: "http://test.com/photo.png",
    });
    const eventData = {
      about: "",
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "palestra" as const,
    };
    event = await fakeProjectsRepository.createEvent(eventData);
    event2 = await fakeProjectsRepository.createEvent({ ...eventData, startTime: new Date(Date.now() + 1) });
    participant = await fakeProjectsRepository.createParticipant({
      birthDate: new Date(),
      course: "Ciência da Computação",
      email: "test@gmail.com",
      matricula: "20200015280",
      name: "Test",
      phoneNumber: "+55 83 99999-9999",
      university: "UFPB",
    });
    participant2 = await fakeProjectsRepository.createParticipant({
      birthDate: new Date(),
      course: "Engenharia da Computação",
      email: "test2@gmail.com",
      matricula: "20200015281",
      name: "Test 2",
      phoneNumber: "+55 83 99999-9998",
      university: "UFPB",
    });

    const first = await fakeProjectsRepository.createAttendance({
      eventId: event.id,
      participantId: participant.id,
    });
    first.createdAt = new Date(Date.now() - 60_000);
    await fakeProjectsRepository.createAttendance({ eventId: event.id, participantId: participant2.id });
    await fakeProjectsRepository.createAttendance({ eventId: event2.id, participantId: participant.id });
  });

  it("should list an event's attendances, newest first, with attendees", async () => {
    const { total, attendances, attendees } = await service.execute({ eventId: event.id });

    expect(total).toBe(2);
    expect(attendances!.map(attendance => attendance.participantId)).toEqual([
      participant2.id,
      participant.id,
    ]);
    expect(attendances![0]).toHaveProperty("createdAt");
    expect(attendees).toEqual([participant2, participant]);
  });

  it("should list a participant's attendance in an event", async () => {
    const { total } = await service.execute({ eventId: event.id, participantId: participant2.id });
    const { total: none } = await service.execute({ eventId: event2.id, participantId: participant2.id });

    expect(total).toBe(1);
    expect(none).toBe(0);
  });

  it("should list all attendances of an edition", async () => {
    const { total, attendees } = await service.execute({ editionId, eventId: undefined! });

    expect(total).toBe(3);
    expect(attendees).toBeUndefined();
  });

  it("should list a participant's attendances in an edition", async () => {
    const { total } = await service.execute({
      editionId,
      eventId: undefined!,
      participantId: participant.id,
    });

    expect(total).toBe(2);
  });

  it("should filter attendances by course", async () => {
    const { total } = await service.execute({
      course: "Ciência da Computação",
      editionId,
      eventId: undefined!,
    });

    expect(total).toBe(2);
  });

  it("should require an edition or event", async () => {
    await expect(service.execute({ eventId: undefined! })).rejects.toBeInstanceOf(HttpException);
  });
});
