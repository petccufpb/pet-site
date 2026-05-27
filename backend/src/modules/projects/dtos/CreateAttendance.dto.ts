import { IsOptional, TransformToBoolean } from "@hyoretsu/decorators";
import { ProjectAttendance } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class CreateAttendanceDTO implements Partial<ProjectAttendance> {
  @IsOptional()
  @TransformToBoolean()
  @IsBoolean()
  admin?: boolean;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  eventId!: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
