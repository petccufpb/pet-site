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

export default class UpdateEditionDTO implements Partial<ProjectEdition> {
  @IsOptional()
  @IsDateString()
  date?: Date;

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  number?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  projectId?: string;
}
