import { IsNotEmpty, IsString } from "class-validator";

export class CreateMemberContactDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  snsId!: string;
}
