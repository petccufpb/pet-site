import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectEvent } from "@prisma/client";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateEventDTO implements Partial<ProjectEvent> {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  onSite?: boolean;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsDate()
  startTime!: Date;

  @IsNotEmpty()
  @IsDate()
  endTime!: Date;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  editionId!: string;
}
