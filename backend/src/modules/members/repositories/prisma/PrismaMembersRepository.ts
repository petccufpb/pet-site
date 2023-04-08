import { Injectable } from "@nestjs/common";
import { Member } from "@prisma/client";

import { PrismaService } from "@database/prisma.service";

import { CreateMemberDTO } from "../../dtos/CreateMemberDTO";
import MembersRepository, { CompleteMember } from "../MembersRepository";

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
        type: {
          notIn: ["founder", "tutor"],
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
}
