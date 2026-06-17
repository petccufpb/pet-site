import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import { MembersController } from "./infra/http/controllers/members.controller";
import { TutorsController } from "./infra/http/controllers/tutors.controller";
import { PrismaMembersRepository } from "./infra/prisma/repositories/PrismaMembersRepository";
import MembersRepository from "./repositories/MembersRepository";
import { CreateMember } from "./services/CreateMember.service";
import { DeleteMember } from "./services/DeleteMember.service";
import { ListMembers } from "./services/ListMembers.service";
import { ListTutors } from "./services/ListTutors.service";
import { UpdateMember } from "./services/UpdateMember.service";

console.log("PROVIDERS TO MODULE:", [
  PrismaService,
  {
    provide: MembersRepository,
    useClass: PrismaMembersRepository,
  },
  CreateMember,
  ListMembers,
  ListTutors,
  UpdateMember,
  DeleteMember,
]);

@Module({
  imports: [],
  controllers: [MembersController, TutorsController],
  providers: [
    PrismaService,
    {
      provide: MembersRepository,
      useClass: PrismaMembersRepository,
    },
    CreateMember,
    ListMembers,
    ListTutors,
    UpdateMember,
    DeleteMember,
  ],
})
export class MembersModule {}
