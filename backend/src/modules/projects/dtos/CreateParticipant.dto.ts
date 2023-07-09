import { ProjectParticipant } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsString, Min } from "class-validator";

export default class CreateParticipantDTO implements Partial<ProjectParticipant> {
  @IsNotEmpty()
  @IsDateString()
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
