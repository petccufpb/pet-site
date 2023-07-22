import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class ListAttendeesDTO {
  @IsOptional()
  @IsString()
  course?: string;

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
