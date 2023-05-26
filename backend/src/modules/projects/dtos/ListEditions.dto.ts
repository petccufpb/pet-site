import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export default class ListEditionsDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId!: string;
}
