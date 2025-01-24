import { IsOptional } from "@hyoretsu/decorators";
import { ProjectParticipant } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class FindExistingParticipantDTO implements Partial<ProjectParticipant> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  matricula: string | null = null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;
}
