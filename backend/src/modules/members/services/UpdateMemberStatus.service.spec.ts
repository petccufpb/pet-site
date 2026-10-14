import { NotFoundException } from "@nestjs/common";

import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { UpdateMemberStatus } from "./UpdateMemberStatus.service";

describe("UpdateMemberStatus", () => {
  let fakeMembersRepository: FakeMembersRepository;
  let service: UpdateMemberStatus;

  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository();
    service = new UpdateMemberStatus(fakeMembersRepository);
  });

  it("should deactivate an active member (mark as alumni/egresso)", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe", isActive: true });

    const updated = await service.execute(member.id, false);

    expect(updated.isActive).toBe(false);
  });

  it("should reactivate an egresso member", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe", isActive: false });

    const updated = await service.execute(member.id, true);

    expect(updated.isActive).toBe(true);
  });

  it("should toggle isActive correctly in sequence", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe", isActive: true });

    await service.execute(member.id, false);
    const reactivated = await service.execute(member.id, true);

    expect(reactivated.isActive).toBe(true);
  });

  it("should throw NotFoundException when member id does not exist", async () => {
    await expect(service.execute("non-existent-id", false)).rejects.toThrow(NotFoundException);
  });

  it("should throw NotFoundException when member is soft-deleted", async () => {
    const member = await fakeMembersRepository.create({ name: "John Doe" });
    await fakeMembersRepository.softDeleteMember(member.id);

    await expect(service.execute(member.id, false)).rejects.toThrow(NotFoundException);
  });
});
