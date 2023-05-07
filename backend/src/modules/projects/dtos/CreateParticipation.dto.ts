import { IsOptional } from "@hyoretsu/decorators";
import { ProjectParticipation } from "@prisma/client";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

export default class CreateParticipationDTO implements Partial<ProjectParticipation> {
  @IsOptional()
  @IsString()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsNumber()
  matricula?: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
