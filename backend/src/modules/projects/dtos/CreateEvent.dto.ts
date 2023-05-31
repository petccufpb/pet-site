import { IsOptional } from "@hyoretsu/decorators";
import { ProjectEvent } from "@prisma/client";
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from "class-validator";

export default class CreateEventDTO implements Partial<ProjectEvent> {
  @IsOptional()
  @IsNumber()
  @Min(0) // min será 1, 0 só para testes
  capacity?: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  editionId!: string;

  @IsNotEmpty()
  @IsDateString()
  endTime!: Date;

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

  @IsString()
  @IsIn(["main", "side"])
  type!: string;
}
