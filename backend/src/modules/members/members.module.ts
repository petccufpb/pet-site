import { Module } from "@nestjs/common";

import { PrismaService } from "@database/prisma.service";
import { AuthModule } from "@modules/auth/auth.module";

import { MembersController } from "./infra/http/controllers/members.controller";
import { TutorsController } from "./infra/http/controllers/tutors.controller";
import { PrismaMembersRepository } from "./infra/prisma/repositories/PrismaMembersRepository";
import MembersRepository from "./repositories/MembersRepository";
import { CreateMember } from "./services/CreateMember.service";
import { DeleteMember } from "./services/DeleteMember.service";
import { ListMembers } from "./services/ListMembers.service";
import { ListTutors } from "./services/ListTutors.service";
import { SoftDeleteMember } from "./services/SoftDeleteMember.service";
import { UpdateMember } from "./services/UpdateMember.service";
import { UpdateMemberStatus } from "./services/UpdateMemberStatus.service";

@Module({
  imports: [AuthModule],
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
    SoftDeleteMember,
    UpdateMemberStatus,
  ],
})
export class MembersModule {}
