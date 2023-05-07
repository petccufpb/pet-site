import { ProjectParticipant } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export default class CreateParticipantDTO implements Partial<ProjectParticipant> {
  @IsNumber()
  @Min(0)
  age!: number;

  @IsString()
  @IsNotEmpty()
  course!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsNumber()
  @Min(0)
  matricula!: number;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  university!: string;
}
