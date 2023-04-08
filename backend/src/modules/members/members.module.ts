import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";

import { MembersController } from "./infra/http/controllers/members.controller";
import { TutorsController } from "./infra/http/controllers/tutors.controller";
import MembersRepository from "./repositories/MembersRepository";
import { PrismaMembersRepository } from "./repositories/prisma/PrismaMembersRepository";
import { CreateMember } from "./services/CreateMember.service";
import { ListMembers } from "./services/ListMembers.service";

@Module({
  imports: [],
  controllers: [MembersController, TutorsController],
  providers: [
    PrismaService,
    {
      provide: MembersRepository,
      useClass: PrismaMembersRepository,
    },
    ...[CreateMember, ListMembers],
  ],
})
export class MembersModule {}
