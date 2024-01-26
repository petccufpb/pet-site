import { ProjectParticipant } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export default class FindExistingParticipantDTO implements Partial<ProjectParticipant> {
  @IsNotEmpty()
  @IsString()
  matricula!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
