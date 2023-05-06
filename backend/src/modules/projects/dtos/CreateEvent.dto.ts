import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectEvent } from "@prisma/client";
import { IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateEventDTO implements Partial<ProjectEvent> {
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  editionId!: string;

  @IsNotEmpty()
  @IsDate()
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
  @IsDate()
  startTime!: Date;

  @IsString()
  @IsIn(["main", "side"])
  type!: string;
}
