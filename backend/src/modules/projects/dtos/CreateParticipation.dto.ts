import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectParticipation } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateParticipationDTO implements Partial<ProjectParticipation> {
  @IsOptional()
  @IsString()
  editionId?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsString()
  @IsNotEmpty()
  participantId!: string;
}
