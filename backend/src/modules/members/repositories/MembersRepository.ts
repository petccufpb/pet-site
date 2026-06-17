import { Member, Prisma } from "@prisma/client";

import { CreateMemberDTO } from "../dtos/CreateMember.dto";
import { UpdateMemberDTO } from "../dtos/UpdateMember.dto";

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
  abstract findById(id: string): Promise<CompleteMember | null>;
  abstract update(id: string, data: UpdateMemberDTO): Promise<Member>;
  abstract delete(id: string): Promise<void>;
}
