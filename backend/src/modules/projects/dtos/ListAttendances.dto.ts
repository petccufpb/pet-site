import { IsOptional } from "@hyoretsu/decorators";
import { IsBoolean, IsString, IsUUID } from "class-validator";

export default class ListAttendancesDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId!: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
