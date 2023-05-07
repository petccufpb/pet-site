import { IsOptional } from "@hyoretsu/nest-decorators";
import { IsEmail, IsNumber, IsString, IsUUID } from "class-validator";

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
  @IsNumber()
  matricula?: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
