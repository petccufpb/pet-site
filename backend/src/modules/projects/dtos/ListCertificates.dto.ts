import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class ListCertificatesDTO {
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
  @IsUUID()
  participantId?: string;
}
