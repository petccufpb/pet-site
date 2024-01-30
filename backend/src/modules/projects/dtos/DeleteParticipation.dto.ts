import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class DeleteParticipationDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  eventId!: string;

  @IsString()
  @IsNotEmpty()
  matricula!: string;
}
