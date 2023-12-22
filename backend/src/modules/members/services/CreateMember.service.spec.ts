import { HttpException } from "@nestjs/common";

import { FakeMembersRepository } from "../repositories/fakes/FakeMembersRepository";
import { CreateMember } from "./CreateMember.service";

describe("CreateMember", () => {
  let service: CreateMember;

  beforeEach(async () => {
    const fakeMembersRepository = new FakeMembersRepository();
    service = new CreateMember(fakeMembersRepository);
  });

  it("should create a member", async () => {
    const user = await service.execute({
      name: "John Doe",
      photoUrl: "",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not create a second decano/tutor", async () => {
    await service.execute({
      name: "John Doe",
      type: "founder",
    });

    await expect(
      service.execute({
        name: "Jane Doe",
        type: "founder",
      }),
    ).rejects.toThrowError(HttpException);
  });
});
