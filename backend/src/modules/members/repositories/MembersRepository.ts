import { Member, Prisma } from "@prisma/client";

import { CreateMemberDTO } from "../dtos/CreateMemberDTO";

export type CompleteMember = Prisma.MemberGetPayload<{
  include: {
    contactInfo: true;
  };
}>;

export default abstract class MembersRepository {
  abstract create(data: CreateMemberDTO): Promise<Member>;
  abstract findByType(type: string): Promise<Member | null>;
  abstract findMembers(): Promise<CompleteMember[]>;
  abstract findTutors(): Promise<CompleteMember[]>;
}
