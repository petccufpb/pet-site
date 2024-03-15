import { IsOptional } from "@hyoretsu/decorators";
import { IsEmail, IsNumber, IsString, IsUUID, Max, Min } from "class-validator";

export default class CreateCertificateDTO {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  attendance?: number;

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
