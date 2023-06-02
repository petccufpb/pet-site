import { IsOptional } from "@hyoretsu/decorators";
import { IsEmail, IsString, IsUUID } from "class-validator";

export default class CreateCertificateDTO {
  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
