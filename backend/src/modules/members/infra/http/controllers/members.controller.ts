import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Member } from "@prisma/client";

import { CreateMemberDTO } from "@modules/members/dtos/CreateMember.dto";
import { UpdateMemberDTO } from "@modules/members/dtos/UpdateMember.dto";
import { CompleteMember } from "@modules/members/repositories/MembersRepository";
import { CreateMember } from "@modules/members/services/CreateMember.service";
import { DeleteMember } from "@modules/members/services/DeleteMember.service";
import { ListMembers } from "@modules/members/services/ListMembers.service";
import { UpdateMember } from "@modules/members/services/UpdateMember.service";

import { AdminAuthGuard } from "../guards/AdminAuth.guard";

console.log("CONTROLLER CHECK:", { AdminAuthGuard });

@Controller("team/members")
export class MembersController {
  constructor(
    private createMember: CreateMember,
    private listMembers: ListMembers,
    private updateMember: UpdateMember,
    private deleteMember: DeleteMember,
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
  @UseGuards(AdminAuthGuard)
  async postMembers(@Body() body: CreateMemberDTO): Promise<Member> {
    const user = await this.createMember.execute(body);

    return user;
  }

  @Patch(":id")
  @UseGuards(AdminAuthGuard)
  async patchMembers(@Param("id") id: string, @Body() body: UpdateMemberDTO): Promise<Member> {
    const member = await this.updateMember.execute(id, body);

    return member;
  }

  @Delete(":id")
  @UseGuards(AdminAuthGuard)
  async deleteMembers(@Param("id") id: string): Promise<void> {
    await this.deleteMember.execute(id);
  }
}
