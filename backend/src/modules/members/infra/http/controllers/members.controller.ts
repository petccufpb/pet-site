import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Member } from "@prisma/client";

import { CreateMemberDTO } from "@modules/members/dtos/CreateMember.dto";
import { CompleteMember } from "@modules/members/repositories/MembersRepository";
import { CreateMember } from "@modules/members/services/CreateMember.service";
import { ListMembers } from "@modules/members/services/ListMembers.service";
import { SoftDeleteMember } from "@modules/members/services/SoftDeleteMember.service";
import { UpdateMemberStatus } from "@modules/members/services/UpdateMemberStatus.service";
import { UpdateMemberStatusDTO } from "@modules/members/dtos/UpdateMemberStatus.dto";

@Controller("team/members")
export class MembersController {
  constructor(
    private createMember: CreateMember,
    private listMembers: ListMembers,
    private softDeleteMember: SoftDeleteMember,
    private updateMemberStatus: UpdateMemberStatus,
  ) {}

  @Get()
  async getMembers(): Promise<CompleteMember[]> {
    const members = await this.listMembers.execute();

    return members;
  }

  @Post()
  async postMembers(@Body() body: CreateMemberDTO): Promise<Member> {
    const user = await this.createMember.execute(body);

    return user;
  }

  @Patch(":id/status")
  async patchMemberStatus(@Param("id") id: string, @Body() body: UpdateMemberStatusDTO): Promise<Member> {
    return this.updateMemberStatus.execute(id, body.isActive);
  }

  @Delete(":id")
  async deleteMember(@Param("id") id: string): Promise<Member> {
    return this.softDeleteMember.execute(id);
  }
}
