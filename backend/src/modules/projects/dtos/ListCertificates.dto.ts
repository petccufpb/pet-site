import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class ListCertificatesDTO {
  @IsOptional()
  @IsString()
  _t?: string;

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

  @IsOptional()
  @IsString()
  @IsUUID()
  speakerId?: string;
}
