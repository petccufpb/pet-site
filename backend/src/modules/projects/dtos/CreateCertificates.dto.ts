import { IsOptional } from "@hyoretsu/decorators";
import { ProjectCertificate } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";

export default class CreateCertificatesDTO implements Partial<ProjectCertificate> {
  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;
}
