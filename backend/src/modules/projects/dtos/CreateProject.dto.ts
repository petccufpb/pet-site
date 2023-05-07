import { Project } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateProjectDTO implements Partial<Project> {
  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsString()
  @IsNotEmpty()
  title!: string;
}
