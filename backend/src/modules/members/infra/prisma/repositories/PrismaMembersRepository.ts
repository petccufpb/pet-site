import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import MembersRepository, { CompleteMember } from "@modules/members/repositories/MembersRepository";

import { CreateMemberDTO } from "../../../dtos/CreateMember.dto";
import { UpdateMemberDTO } from "../../../dtos/UpdateMember.dto";

@Injectable()
export class PrismaMembersRepository implements MembersRepository {
  constructor(private prisma: PrismaService) {}

  async create({ contactInfo = [], ...data }: CreateMemberDTO): Promise<Member> {
    const member = await this.prisma.member.create({
      data: {
        ...data,
        contactInfo: {
          createMany: {
            data: contactInfo,
          },
        },
      },
    });

    return member;
  }

  async findByType(type: string): Promise<Member | null> {
    const user = await this.prisma.member.findFirst({
      where: {
        type,
      },
    });

    return user;
  }

  async findMembers(): Promise<CompleteMember[]> {
    const members = await this.prisma.member.findMany({
      where: {
        OR: [
          {
            type: null,
          },
          {
            type: {
              notIn: ["founder", "tutor"],
            },
          },
        ],
      },
      orderBy: { name: "asc" },
      include: {
        contactInfo: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return members;
  }

  async findTutors(): Promise<CompleteMember[]> {
    const members = await this.prisma.member.findMany({
      where: {
        type: {
          in: ["founder", "tutor"],
        },
      },
      orderBy: { name: "asc" },
      include: {
        contactInfo: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return members;
  }

  async findById(id: string): Promise<CompleteMember | null> {
    const member = await this.prisma.member.findUnique({
      where: { id },
      include: {
        contactInfo: {
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    return member;
  }

  async update(id: string, { contactInfo, ...data }: UpdateMemberDTO): Promise<Member> {
    const updateData: any = { ...data };

    if (contactInfo) {
      updateData.contactInfo = {
        deleteMany: {},
        createMany: {
          data: contactInfo,
        },
      };
    }

    const member = await this.prisma.member.update({
      where: { id },
      data: updateData,
      include: {
        contactInfo: true,
      },
    });

    return member;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.memberContact.deleteMany({
        where: { memberId: id },
      }),
      this.prisma.member.delete({
        where: { id },
      }),
    ]);
  }
}
