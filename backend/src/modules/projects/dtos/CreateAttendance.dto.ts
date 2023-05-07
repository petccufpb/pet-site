import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectAttendance } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateAttendanceDTO implements Partial<ProjectAttendance> {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  eventId!: string;

  @IsOptional()
  @IsNumber()
  matricula?: number;
}
