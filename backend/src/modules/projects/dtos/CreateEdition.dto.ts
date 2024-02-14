import { ProjectEdition } from "@prisma/client";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
} from "class-validator";

export default class CreateEditionDTO implements Partial<ProjectEdition> {
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logoUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  minimumAttendance?: number;

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
