import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class UpdateParticipantDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  course?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phoneNumber?: string;
}
