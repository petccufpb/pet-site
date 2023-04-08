import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";

import { CreateMemberDTO } from "@modules/members/dtos/CreateMember.dto";
import MembersRepository, { CompleteMember } from "@modules/members/repositories/MembersRepository";

@Controller("team/members")
export class MembersController {
  constructor(private membersRepository: MembersRepository) {}

  @Get()
  async getMembers(): Promise<CompleteMember[]> {
    const members = await this.membersRepository.findMembers();

    return members;
  }

  @Post()
  async postMembers(@Body() { type, ...body }: CreateMemberDTO) {
    if (type === "decano" || type === "founder") {
      const existingUser = await this.membersRepository.findByType(type);

      if (existingUser) {
        throw new HttpException("There is already a decano/founder", HttpStatus.FORBIDDEN);
      }
    }

    const user = await this.membersRepository.create({ ...body, type });

    return user;
  }
}
