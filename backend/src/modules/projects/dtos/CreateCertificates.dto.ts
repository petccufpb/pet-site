import { IsOptional } from "@hyoretsu/nest-decorators";
import { ProjectCertificate } from "@prisma/client";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class CreateCertificatesDTO implements Partial<ProjectCertificate> {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  editionId!: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;
}
