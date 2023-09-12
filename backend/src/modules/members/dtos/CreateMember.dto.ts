import { IsOptional } from "@hyoretsu/decorators";
import { MemberContact } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";

import { CreateMemberContactDTO } from "./CreateMemberContact.dto";

export class CreateMemberDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  about?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @IsIn(["decano", "founder", "tutor"])
  type?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberContactDTO)
  contactInfo?: MemberContact[];
}
