import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Member } from "@prisma/client";

import { CreateMemberDTO } from "@modules/members/dtos/CreateMember.dto";
import { UpdateMemberDTO } from "@modules/members/dtos/UpdateMember.dto";
import { UpdateMemberStatusDTO } from "@modules/members/dtos/UpdateMemberStatus.dto";
import { CompleteMember } from "@modules/members/repositories/MembersRepository";
import { CreateMember } from "@modules/members/services/CreateMember.service";
import { DeleteMember } from "@modules/members/services/DeleteMember.service";
import { ListMembers } from "@modules/members/services/ListMembers.service";
import { SoftDeleteMember } from "@modules/members/services/SoftDeleteMember.service";
import { UpdateMember } from "@modules/members/services/UpdateMember.service";
import { UpdateMemberStatus } from "@modules/members/services/UpdateMemberStatus.service";

import { AdminAuthGuard } from "../guards/AdminAuth.guard";

@Controller("team/members")
export class MembersController {
  constructor(
    private createMember: CreateMember,
    private listMembers: ListMembers,
    private updateMember: UpdateMember,
    private deleteMemberService: DeleteMember,
    private softDeleteMember: SoftDeleteMember,
    private updateMemberStatus: UpdateMemberStatus,
  ) {}

  @Get()
  async getMembers(): Promise<CompleteMember[]> {
    const members = await this.listMembers.execute();

    return members;
  }

  @Get("auth-check")
  @UseGuards(AdminAuthGuard)
  async authCheck(): Promise<{ ok: boolean }> {
    return { ok: true };
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

  @Patch(":id")
  @UseGuards(AdminAuthGuard)
  async patchMembers(@Param("id") id: string, @Body() body: UpdateMemberDTO): Promise<Member> {
    const member = await this.updateMember.execute(id, body);

    return member;
  }

  @Delete(":id")
  async deleteMember(@Param("id") id: string): Promise<Member> {
    return this.softDeleteMember.execute(id);
  }
}
