import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectParticipation } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateParticipationDTO implements Partial<ProjectParticipation> {
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
}
