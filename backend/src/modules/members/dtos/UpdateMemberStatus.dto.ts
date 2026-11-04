import { IsBoolean } from "class-validator";

export class UpdateMemberStatusDTO {
  @IsBoolean()
  isActive!: boolean;
}