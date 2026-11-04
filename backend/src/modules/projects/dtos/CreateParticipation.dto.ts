import { IsOptional } from "@hyoretsu/decorators";
import { ProjectParticipation } from "@prisma/client";
import { IsBoolean, IsEmail, IsString, IsUUID } from "class-validator";

export default class CreateParticipationDTO implements Partial<ProjectParticipation> {
  @IsOptional()
  @IsString()
  editionId?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  eventId?: string;

  /** Inscrição feita pelo painel admin durante o check-in: ignora prazo, vagas e limite por edição */
  @IsOptional()
  @IsBoolean()
  manual?: boolean;

  @IsOptional()
  @IsString()
  matricula?: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  participantId?: string;
}
