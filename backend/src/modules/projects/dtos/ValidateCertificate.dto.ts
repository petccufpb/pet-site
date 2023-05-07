import { IsOptional } from "@hyoretsu/decorators";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export default class ValidateCertificateDTO {
  @IsNotEmpty()
  @IsString()
  certificateId!: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  matricula?: number;
}
