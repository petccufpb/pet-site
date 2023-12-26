import { IsOptional } from "@hyoretsu/decorators";
import { News } from "@prisma/client";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export default class CreateNewsDTO implements Partial<News> {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  body!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  backgroundUrl?: string;
}
