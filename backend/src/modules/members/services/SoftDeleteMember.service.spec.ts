import { NotFoundException } from "@nestjs/common";

import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { SoftDeleteMember } from "./SoftDeleteMember.service";

describe("SoftDeleteMember", () => {
  let fakeMembersRepository: FakeMembersRepository;
  let service: SoftDeleteMember;

  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository();
    service = new SoftDeleteMember(fakeMembersRepository);
  });

  it("should set deletedAt when soft-deleting a member", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe" });

    const deleted = await service.execute(member.id);

    expect(deleted.deletedAt).not.toBeNull();
    expect(deleted.id).toBe(member.id);
  });

  it("should hide the member from the active members listing after soft-deletion", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe" });

    await service.execute(member.id);

    const activeMembers = await fakeMembersRepository.findMembers();
    expect(activeMembers.find(m => m.id === member.id)).toBeUndefined();
  });

  it("should throw NotFoundException when member id does not exist", async () => {
    await expect(service.execute("non-existent-id")).rejects.toThrow(NotFoundException);
  });

  it("should throw NotFoundException when member is already soft-deleted", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe" });
    await service.execute(member.id);

    await expect(service.execute(member.id)).rejects.toThrow(NotFoundException);
  });
});
