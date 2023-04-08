import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";

import { CreateMemberDTO } from "../dtos/CreateMember.dto";
import MembersRepository from "../repositories/MembersRepository";

@Injectable()
export class CreateMember {
  constructor(private membersRepository: MembersRepository) {}

  async execute({ type, ...data }: CreateMemberDTO): Promise<Member> {
    if (type === "decano" || type === "founder") {
      const existingUser = await this.membersRepository.findByType(type);

      if (existingUser) {
        throw new HttpException("There is already a decano/founder", HttpStatus.FORBIDDEN);
      }
    }

    const user = await this.membersRepository.create({ ...data, type });

    return user;
  }
}
