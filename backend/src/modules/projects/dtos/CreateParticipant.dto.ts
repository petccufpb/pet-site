import { ProjectParticipant } from "@prisma/client";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateParticipantDTO implements Partial<ProjectParticipant> {
  @IsNotEmpty()
  @IsDateString()
  birthDate!: Date;

  @IsNotEmpty()
  @IsString()
  course!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  matricula: string | null = null;

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
