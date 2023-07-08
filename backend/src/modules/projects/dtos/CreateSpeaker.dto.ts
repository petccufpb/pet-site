import { ProjectSpeaker } from "@prisma/client";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export default class CreateSpeakerDTO implements Partial<ProjectSpeaker> {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  photoUrl!: string;
}
