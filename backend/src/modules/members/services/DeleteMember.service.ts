import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import MembersRepository from "../repositories/MembersRepository";

@Injectable()
export class DeleteMember {
  constructor(private membersRepository: MembersRepository) {}

  async execute(id: string): Promise<void> {
    const existingMember = await this.membersRepository.findById(id);

    if (!existingMember) {
      throw new HttpException("Membro não encontrado", HttpStatus.NOT_FOUND);
    }

    await this.membersRepository.delete(id);
  }
}
