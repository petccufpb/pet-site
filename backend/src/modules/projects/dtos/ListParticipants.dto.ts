import { IsOptional } from "@hyoretsu/decorators";
import { IsNumber, IsString, IsUUID } from "class-validator";

export default class ListParticipantsDTO {
  @IsOptional()
  @IsNumber()
  birthYear?: number;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;

  @IsOptional()
  @IsNumber()
  periodoGeral?: number;

  @IsOptional()
  @IsString()
  university?: string;
}
