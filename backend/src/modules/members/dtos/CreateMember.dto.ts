import { IsOptional } from "@hyoretsu/decorators";
import { MemberContact } from "@prisma/client";
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateMemberDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  @IsIn(["", "decano", "founder", "tutor"])
  type?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  contactInfo?: MemberContact[];
}
