import { IsOptional } from "@hyoretsu/decorators";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export default class SearchParticipantsDTO {
  @IsOptional()
  @IsString()
  _t?: string;

  /** Restringe a busca aos inscritos nessa edição */
  @IsOptional()
  @IsString()
  @IsUUID()
  editionId?: string;

  /** Marca quais resultados já têm frequência nesse evento */
  @IsOptional()
  @IsString()
  @IsUUID()
  eventId?: string;

  /** Trecho do nome, e-mail ou matrícula */
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  q!: string;
}
