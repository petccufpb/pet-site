import MembersRepository from "../repositories/MembersRepository";
import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { ListTutors } from "./ListTutors.service";

describe("ListTutors", () => {
  let membersRepository: MembersRepository;
  let service: ListTutors;

  beforeEach(async () => {
    membersRepository = new FakeMembersRepository();
    service = new ListTutors(membersRepository);
  });

  it("should be able to list all tutors", async () => {
    const tutor = await membersRepository.create({
      name: "John Doe",
      type: "tutor",
    });

    const tutors = await service.execute();

    expect(tutors).toContain(tutor);
  });
});
