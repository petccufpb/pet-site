import { IsOptional } from "@hyoretsu/decorators";
import { ProjectEvent } from "@prisma/client";
import { IsBoolean, IsDateString, IsIn, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export default class CreateEventDTO implements Partial<ProjectEvent> {
  @IsOptional()
  @IsString()
  about!: string | null;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  editionId!: string;

  @IsNotEmpty()
  @IsDateString()
  endTime!: Date;

  @IsOptional()
  @IsNumber()
  @Min(1)
  extraCapacity?: number;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsBoolean()
  onSite?: boolean;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  speakerId!: string;

  @IsNotEmpty()
  @IsDateString()
  startTime!: Date;

  @IsOptional()
  @IsString()
  @IsIn(["main", "minicurso", "palestra"])
  type!: string | null;
}
