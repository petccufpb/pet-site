import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class ListParticipantsDTO {
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
  eventId?: string;

  @IsOptional()
  @IsString()
  university?: string;
}
