import { Controller, Get } from "@nestjs/common";

import { CompleteMember } from "@modules/members/repositories/MembersRepository";
import { ListTutors } from "@modules/members/services/ListTutors.service";

@Controller("team/tutors")
export class TutorsController {
  constructor(private listTutors: ListTutors) {}

  @Get()
  async getTutors(): Promise<CompleteMember[]> {
    const tutors = await this.listTutors.execute();

    return tutors;
  }
}
