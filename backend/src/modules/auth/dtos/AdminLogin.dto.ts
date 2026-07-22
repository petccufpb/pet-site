import { IsNotEmpty, IsString } from "class-validator";

export default class AdminLoginDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
