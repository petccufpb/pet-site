import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";

import { UpdateMemberDTO } from "../dtos/UpdateMember.dto";
import MembersRepository from "../repositories/MembersRepository";

@Injectable()
export class UpdateMember {
  constructor(private membersRepository: MembersRepository) {}

  async execute(id: string, { photoUrl, type, ...data }: UpdateMemberDTO): Promise<Member> {
    const existingMember = await this.membersRepository.findById(id);

    if (!existingMember) {
      throw new HttpException("Membro não encontrado", HttpStatus.NOT_FOUND);
    }

    if (type && type !== existingMember.type && (type === "decano" || type === "founder")) {
      const existingUserWithType = await this.membersRepository.findByType(type);

      if (existingUserWithType && existingUserWithType.id !== id) {
        throw new HttpException(`Já existe um ${type}`, HttpStatus.FORBIDDEN);
      }
    }

    const updatedMember = await this.membersRepository.update(id, {
      ...data,
      photoUrl: photoUrl ? photoUrl.replace(/file\/d\/(.+?)\/view.*/g, "uc?id=$1") : undefined,
      type,
    });

    return updatedMember;
  }
}
