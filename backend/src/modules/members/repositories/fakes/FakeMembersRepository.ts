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

  async findMembers(): Promise<CompleteMember[]> {
    const members = this.members.filter(member => member.type !== "founder" && member.type !== "tutor");

    return members;
  }

  async findTutors(): Promise<CompleteMember[]> {
    const members = this.members.filter(member => member.type === "founder" || member.type === "tutor");

    return members;
  }

  async findById(id: string): Promise<CompleteMember | null> {
    const member = this.members.find(m => m.id === id);

    return member || null;
  }

  async update(id: string, data: UpdateMemberDTO): Promise<Member> {
    const memberIndex = this.members.findIndex(m => m.id === id);

    if (memberIndex === -1) {
      throw new Error("Membro não encontrado");
    }

    const currentMember = this.members[memberIndex];

    let updatedContactInfo = currentMember.contactInfo;
    if (data.contactInfo) {
      updatedContactInfo = data.contactInfo.map((c: any) => ({
        ...c,
        id: c.id || randomUUID(),
        memberId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    }

    const updatedMember = {
      ...currentMember,
      name: data.name !== undefined ? data.name : currentMember.name,
      about: data.about !== undefined ? data.about : currentMember.about,
      photoUrl: data.photoUrl !== undefined ? data.photoUrl : currentMember.photoUrl,
      type: data.type !== undefined ? (data.type || "") : currentMember.type,
      isActive: data.isActive !== undefined ? data.isActive : currentMember.isActive,
      contactInfo: updatedContactInfo,
      updatedAt: new Date(),
    };

    this.members[memberIndex] = updatedMember;

    return updatedMember;
  }

  async delete(id: string): Promise<void> {
    const memberIndex = this.members.findIndex(m => m.id === id);

    if (memberIndex !== -1) {
      this.members.splice(memberIndex, 1);
    }
  }
}
