import { IsOptional } from "@hyoretsu/decorators";
import { IsString, IsUUID } from "class-validator";

export default class FindParticipantDTO {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  matricula?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
