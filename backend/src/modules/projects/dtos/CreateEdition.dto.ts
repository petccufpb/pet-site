import { ProjectEdition } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateEditionDTO implements Partial<ProjectEdition> {
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
