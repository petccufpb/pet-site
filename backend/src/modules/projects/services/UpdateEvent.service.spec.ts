import { HttpException } from "@nestjs/common";
import { ProjectEdition, ProjectEvent, ProjectSpeaker } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import UpdateEvent from "./UpdateEvent.service";

describe("UpdateEvent", () => {
  let fakeProjectsRepository: FakeProjectsRepository;
  let service: UpdateEvent;
  let edition: ProjectEdition;
  let speaker: ProjectSpeaker;
  let speaker2: ProjectSpeaker;
  let event: ProjectEvent;

  beforeEach(async () => {
    fakeProjectsRepository = new FakeProjectsRepository();
    service = new UpdateEvent(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
    edition = await fakeProjectsRepository.createEdition({ date: new Date(), number: 1, projectId });

    speaker = await fakeProjectsRepository.createSpeaker({
      about: "",
      name: "Speaker 1",
      photoUrl: "http://test.com/photo1.png",
    });

    speaker2 = await fakeProjectsRepository.createSpeaker({
      about: "",
      name: "Speaker 2",
      photoUrl: "http://test.com/photo2.png",
    });

    const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);

    event = await fakeProjectsRepository.createEvent({
      name: "Original Name",
      about: "",
      editionId: edition.id,
      speakerId: speaker.id,
      startTime,
      endTime,
      capacity: 50,
      extraCapacity: 5,
      location: "Room 101",
      onSite: true,
      type: "palestra",
    });
  });

  it("should not be able to update a non-existing event", async () => {
    await expect(
      service.execute("invalid-id", {
        name: "New Name",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to update with endTime before startTime", async () => {
    const startTime = new Date();
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() - 1);

    await expect(
      service.execute(event.id, {
        startTime,
        endTime,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should be able to update event name, speaker, schedule and capacity", async () => {
    const newStart = new Date();
    newStart.setDate(newStart.getDate() + 1);
    const newEnd = new Date(newStart);
    newEnd.setHours(newEnd.getHours() + 3);

    const updated = await service.execute(event.id, {
      name: "Updated Event Name",
      speakerId: speaker2.id,
      startTime: newStart,
      endTime: newEnd,
      capacity: 120,
      extraCapacity: 20,
    });

    expect(updated.name).toBe("Updated Event Name");
    expect(updated.speakerId).toBe(speaker2.id);
    expect(updated.capacity).toBe(120);
    expect(updated.extraCapacity).toBe(20);
  });
});
