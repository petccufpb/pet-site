import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateMemberDTO } from "../../dtos/CreateMember.dto";
import { UpdateMemberDTO } from "../../dtos/UpdateMember.dto";
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

  async findById(id: string): Promise<CompleteMember | null> {
    const member = this.members.find(found => found.id === id) ?? null;

    return member;
  }

  async update(id: string, { contactInfo, ...data }: UpdateMemberDTO): Promise<Member> {
    const memberIndex = this.members.findIndex(found => found.id === id);
    const existingMember = this.members[memberIndex];

    // Ignora campos indefinidos, replicando a semântica do Prisma (undefined = não alterar)
    const definedData = Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));

    const updatedMember: CompleteMember = {
      ...existingMember,
      ...definedData,
      ...(contactInfo ? { contactInfo: contactInfo as CompleteMember["contactInfo"] } : {}),
      updatedAt: new Date(),
    };

    this.members[memberIndex] = updatedMember;

    return updatedMember;
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
