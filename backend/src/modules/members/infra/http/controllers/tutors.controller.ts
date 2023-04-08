import { Controller, Get } from "@nestjs/common";

import MembersRepository, { CompleteMember } from "@modules/members/repositories/MembersRepository";

@Controller("team/tutors")
export class TutorsController {
  constructor(private membersRepository: MembersRepository) {}

  @Get()
  async getTutors(): Promise<CompleteMember[]> {
    const tutors = await this.membersRepository.findTutors();

    return tutors;
  }
}
