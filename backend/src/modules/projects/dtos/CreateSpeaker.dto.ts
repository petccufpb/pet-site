import { ProjectSpeaker } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateSpeakerDTO implements Partial<ProjectSpeaker> {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  photoUrl!: string;
}
