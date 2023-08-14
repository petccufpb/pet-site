import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class ListEventsDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;
}
