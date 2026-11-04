import { Injectable, NotFoundException } from "@nestjs/common";
import { Member } from "@prisma/client";

import MembersRepository from "../repositories/MembersRepository";

@Injectable()
export class UpdateMemberStatus {
  constructor(private membersRepository: MembersRepository) {}

  async execute(id: string, isActive: boolean): Promise<Member> {
    const member = await this.membersRepository.findMemberById(id);
    if (!member || member.deletedAt) {
      throw new NotFoundException("Membro não encontrado");
    }

    return this.membersRepository.setMemberActive(id, isActive);
  }
}