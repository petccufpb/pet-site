import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateMemberDTO } from "@modules/members/dtos/CreateMember.dto";
import { CompleteMember } from "@modules/members/repositories/MembersRepository";
import { CreateMembers } from "@modules/members/services/CreateMember.service";
import { ListMembers } from "@modules/members/services/ListMembers.service";

@Controller("team/members")
export class MembersController {
  constructor(private createMembers: CreateMembers, private listMembers: ListMembers) {}

  @Get()
  async getMembers(): Promise<CompleteMember[]> {
    const members = await this.listMembers.execute();

    return members;
  }

  @Post()
  async postMembers(@Body() body: CreateMemberDTO) {
    const user = await this.createMembers.execute(body);

    return user;
  }
}
