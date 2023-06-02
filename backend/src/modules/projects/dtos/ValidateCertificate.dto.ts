import { IsOptional } from "@hyoretsu/decorators";
import { IsNotEmpty, IsString } from "class-validator";

export default class ValidateCertificateDTO {
  @IsNotEmpty()
  @IsString()
  certificateId!: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  matricula?: string;
}
