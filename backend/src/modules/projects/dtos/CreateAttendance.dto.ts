import { IsOptional } from "@hyoretsu/decorators";
import { ProjectAttendance } from "@prisma/client";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class CreateAttendanceDTO implements Partial<ProjectAttendance> {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  eventId!: string;

  /** Check-in feito pelo painel admin: aceita qualquer tipo de evento e não envia e-mail */
  @IsOptional()
  @IsBoolean()
  manual?: boolean;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
