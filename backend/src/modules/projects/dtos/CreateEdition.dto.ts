import { ProjectEdition } from "@prisma/client";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export default class CreateEditionDTO implements Partial<ProjectEdition> {
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsNumber()
  @Min(0)
  number!: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId!: string;
}
