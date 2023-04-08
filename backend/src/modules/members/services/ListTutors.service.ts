import { Injectable } from "@nestjs/common";

import MembersRepository, { CompleteMember } from "../repositories/MembersRepository";

@Injectable()
export class ListTutors {
  constructor(private membersRepository: MembersRepository) {}

  async execute(): Promise<CompleteMember[]> {
    const members = await this.membersRepository.findTutors();

    return members;
  }
}
