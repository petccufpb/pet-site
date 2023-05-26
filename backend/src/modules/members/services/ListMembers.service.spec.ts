import MembersRepository from "../repositories/MembersRepository";
import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { ListMembers } from "./ListMembers.service";

describe("ListMembers", () => {
  let membersRepository: MembersRepository;
  let service: ListMembers;

  beforeEach(async () => {
    membersRepository = new FakeMembersRepository();
    service = new ListMembers(membersRepository);
  });

  it("should be able to list all members", async () => {
    const user = await membersRepository.create({
      name: "John Doe",
    });

    const users = await service.execute();

    expect(users).toContain(user);
  });
});
