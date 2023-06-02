import { HttpException } from "@nestjs/common";
import { ProjectCertificate, ProjectParticipant } from "@prisma/client";

import FakeProjectsRepository from "../repositories/fakes/projects.repository";
import ValidateCertificate from "./ValidateCertificate.service";

describe("ValidateCertificate", () => {
  let certificate: ProjectCertificate;
  let participant: ProjectParticipant;
  let service: ValidateCertificate;

  beforeEach(async () => {
    const fakeProjectsRepository = new FakeProjectsRepository();
    service = new ValidateCertificate(fakeProjectsRepository);

    const { id: projectId } = await fakeProjectsRepository.createProject({ title: "Test Project" });
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
    const { id: eventId } = await fakeProjectsRepository.createEvent({
      editionId,
      endTime: new Date(),
      name: "Test Event",
      speakerId,
      startTime: new Date(),
      type: "side",
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
    await fakeProjectsRepository.createParticipation({
      editionId,
      participantId: participant.id,
    });
    await fakeProjectsRepository.createParticipation({
      eventId,
      participantId: participant.id,
    });
    await fakeProjectsRepository.createAttendance({
      eventId,
      participantId: participant.id,
    });
    certificate = await fakeProjectsRepository.createCertificate({
      editionId,
      eventId,
      participantId: participant.id,
    });
  });

  it("should be able to validate a certificate", async () => {
    const emailValidation = await service.execute({
      certificateId: certificate.id,
      email: participant.email,
    });

    const matriculaValidation = await service.execute({
      certificateId: certificate.id,
      matricula: participant.matricula,
    });

    expect(emailValidation).toEqual(true);
    expect(matriculaValidation).toEqual(true);
  });

  it("should not be able to validate a non-existent certificate", async () => {
    await expect(
      service.execute({
        certificateId: "fake-certificate-id",
        email: participant.email,
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        certificateId: "fake-certificate-id",
        matricula: participant.matricula,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to validate a certificate using non-registered email/matricula", async () => {
    await expect(
      service.execute({
        certificateId: certificate.id,
        email: "fake@gmail.com",
      }),
    ).rejects.toBeInstanceOf(HttpException);

    await expect(
      service.execute({
        certificateId: certificate.id,
        matricula: "20200015281",
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it("should not be able to validate a certificate without providing email nor matricula", async () => {
    await expect(
      service.execute({
        certificateId: certificate.id,
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
