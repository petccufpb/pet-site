import { IsOptional } from "@hyoretsu/decorators";
import { ProjectParticipant } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class FindExistingParticipantDTO implements Partial<ProjectParticipant> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  matricula!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}
