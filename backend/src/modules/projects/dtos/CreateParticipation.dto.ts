import { ProjectParticipation } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateParticipationDTO implements Partial<ProjectParticipation> {
  @IsNotEmpty()
  editionId!: string;

  @IsString()
  @IsNotEmpty()
  participantId!: string;
}
