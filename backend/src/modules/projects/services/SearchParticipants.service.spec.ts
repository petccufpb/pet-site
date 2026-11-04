import { HttpException } from "@nestjs/common";
import { ProjectEvent, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import SearchParticipants from "./SearchParticipants.service";

describe("SearchParticipants", () => {
  let editionId: string;
  let event: ProjectEvent;
  let fakeProjectsRepository: FakeProjectsRepository;
  let maria: ProjectParticipant;
  let mariana: ProjectParticipant;
  let service: SearchParticipants;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new SearchParticipants(fakeProjectsRepository);

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
    event = await fakeProjectsRepository.createEvent({
      about: "",
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "palestra",
    });

    const base = { birthDate: new Date(), course: "CC", university: "UFPB" };
    mariana = await fakeProjectsRepository.createParticipant({
      ...base,
      email: "mariana@gmail.com",
      matricula: "20200015281",
      name: "Mariana Souza",
      phoneNumber: "+55 83 99999-9998",
    });
    maria = await fakeProjectsRepository.createParticipant({
      ...base,
      email: "maria@gmail.com",
      matricula: "20200015280",
      name: "Maria Silva",
      phoneNumber: "+55 83 99999-9999",
    });
    await fakeProjectsRepository.createParticipant({
      ...base,
      email: "joao@gmail.com",
      matricula: null,
      name: "João",
      phoneNumber: "+55 83 99999-9997",
    });

    await fakeProjectsRepository.createParticipation({ editionId, participantId: maria.id });
  });

  it("should search participants by name, email or matricula, sorted by name", async () => {
    const byName = await service.execute({ q: "MARIA" });
    const byEmail = await service.execute({ q: "mariana@" });
    const byMatricula = await service.execute({ q: "15280" });

    expect(byName.map(participant => participant.id)).toEqual([maria.id, mariana.id]);
    expect(byEmail.map(participant => participant.id)).toEqual([mariana.id]);
    expect(byMatricula.map(participant => participant.id)).toEqual([maria.id]);
    expect(byName[0]).not.toHaveProperty("attended");
  });

  it("should restrict the search to an edition's participants", async () => {
    const participants = await service.execute({ editionId, q: "maria" });

    expect(participants.map(participant => participant.id)).toEqual([maria.id]);
  });

  it("should flag participants that already attended an event", async () => {
    await fakeProjectsRepository.createAttendance({ eventId: event.id, participantId: mariana.id });

    const participants = await service.execute({ eventId: event.id, q: " maria " });

    expect(participants).toEqual([
      expect.objectContaining({ id: maria.id, attended: false }),
      expect.objectContaining({ id: mariana.id, attended: true }),
    ]);
  });

  it("should not search with less than 2 characters after trimming", async () => {
    await expect(service.execute({ q: "   " })).rejects.toBeInstanceOf(HttpException);
    await expect(service.execute({ q: " a " })).rejects.toBeInstanceOf(HttpException);
  });
});
