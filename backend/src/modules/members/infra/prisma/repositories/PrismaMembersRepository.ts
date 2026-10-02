import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";
import MembersRepository, { CompleteMember } from "@modules/members/repositories/MembersRepository";

import { CreateMemberDTO } from "../../../dtos/CreateMember.dto";

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
        deletedAt: null,
      },
    });

    return user;
  }

  async findMembers(): Promise<CompleteMember[]> {
    const members = await this.prisma.member.findMany({
      where: {
        deletedAt: null,
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
        deletedAt: null,
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

  async findMemberById(id: string): Promise<Member | null> {
    return this.prisma.member.findUnique({ where: { id } });
  }

  async setMemberActive(id: string, isActive: boolean): Promise<Member> {
    return this.prisma.member.update({ where: { id }, data: { isActive } });
  }

  async softDeleteMember(id: string): Promise<Member> {
    return this.prisma.member.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
