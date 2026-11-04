import { IsOptional } from "@hyoretsu/decorators";
import { ProjectEvent } from "@prisma/client";
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsString,
  IsUUID,
  IsUrl,
  Min,
} from "class-validator";

export default class UpdateEventDTO implements Partial<ProjectEvent> {
  @IsOptional()
  @IsString()
  about?: string | null;

  @IsOptional()
  @IsBoolean()
  allowMultiple?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @IsOptional()
  @IsString()
  @IsUrl()
  externalSignup?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  extraCapacity?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  onSite?: boolean;

  @IsOptional()
  @IsString()
  @IsUUID()
  speakerId?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsString()
  @IsIn(["main", "minicurso", "palestra"])
  type?: string | null;
}
