import { ProjectParticipant } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class FindExistingParticipantDTO implements Partial<ProjectParticipant> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  matricula!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
