import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateMemberDTO } from "../../dtos/CreateMember.dto";
import MembersRepository, { CompleteMember } from "../MembersRepository";

@Injectable()
export class FakeMembersRepository implements MembersRepository {
  private members: CompleteMember[] = [];

  async create({ about, contactInfo, isActive, photoUrl, type, ...data }: CreateMemberDTO): Promise<Member> {
    const member = {
      ...data,
      about: about || "",
      contactInfo: contactInfo || [],
      createdAt: new Date(),
      id: randomUUID(),
      isActive: isActive || true,
      photoUrl: photoUrl || "",
      type: type || "",
      updatedAt: new Date(),
    };

    this.members.push(member);

    return member;
  }

  async findByType(type: string): Promise<Member | null> {
    const user = this.members.find(member => member.type === type) as Member | null;

    return user;
  }

  async findMembers(): Promise<CompleteMember[]> {
    const members = this.members.filter(member => member.type !== "founder" && member.type !== "tutor");

    return members;
  }

  async findTutors(): Promise<CompleteMember[]> {
    const members = this.members.filter(member => member.type === "founder" || member.type === "tutor");

    return members;
  }
}
