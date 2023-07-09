import { ProjectParticipant } from "@prisma/client";
import { IsDate, IsNotEmpty, IsString, Min } from "class-validator";

export default class CreateParticipantDTO implements Partial<ProjectParticipant> {
  @IsNotEmpty()
  @IsDate()
  birthDate!: Date;

  @IsNotEmpty()
  @IsString()
  course!: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsString()
  matricula!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  university!: string;
}
