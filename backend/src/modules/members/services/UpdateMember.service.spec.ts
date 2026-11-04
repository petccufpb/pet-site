import { HttpException, HttpStatus } from "@nestjs/common";
import { Member } from "@prisma/client";
import { randomUUID } from "crypto";

import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { UpdateMember } from "./UpdateMember.service";

describe("UpdateMember", () => {
  let membersRepository: FakeMembersRepository;
  let service: UpdateMember;

  beforeEach(async () => {
    membersRepository = new FakeMembersRepository();
    service = new UpdateMember(membersRepository);
  });

  it("should be able to update a member", async () => {
    const member = await membersRepository.create({
      name: "John Doe",
    });

    const updatedMember = await service.execute(member.id, {
      name: "John Doe Updated",
      about: "Desenvolvedor",
    });

    expect(updatedMember).toHaveProperty("id", member.id);
    expect(updatedMember).toHaveProperty("name", "John Doe Updated");
    expect(updatedMember).toHaveProperty("about", "Desenvolvedor");
  });

  it("should be able to update only the member status", async () => {
    const member = await membersRepository.create({
      name: "John Doe",
      isActive: true,
    });

    const updatedMember = await service.execute(member.id, {
      isActive: false,
    });

    expect(updatedMember).toHaveProperty("id", member.id);
    expect(updatedMember).toHaveProperty("isActive", false);
  });

  it("should throw NotFound when the member does not exist", async () => {
    await expect(service.execute(randomUUID(), { name: "Ghost" })).rejects.toThrow(
      new HttpException("Membro não encontrado", HttpStatus.NOT_FOUND),
    );
  });

  it("should not allow two founders", async () => {
    const founder = await membersRepository.create({
      name: "Founder",
      type: "founder",
    });

    const anotherMember = await membersRepository.create({
      name: "Another Member",
    });

    await expect(service.execute(anotherMember.id, { type: "founder" })).rejects.toThrow(
      new HttpException("Já existe um founder", HttpStatus.FORBIDDEN),
    );

    // O próprio fundador pode continuar sendo atualizado
    const updatedFounder = await service.execute(founder.id, { type: "founder", about: "Primeiro" });
    expect(updatedFounder).toHaveProperty("id", founder.id);
  });
});
