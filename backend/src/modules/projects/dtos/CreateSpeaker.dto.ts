import { IsOptional } from "@hyoretsu/decorators";
import { ProjectSpeaker } from "@prisma/client";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export default class CreateSpeakerDTO implements Partial<ProjectSpeaker> {
  @IsOptional()
  @IsString()
  about!: string | null;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  photoUrl = '';
}
