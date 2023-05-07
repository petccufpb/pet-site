import { IsNotEmpty, IsString } from "class-validator";

export default class FindLatestEditionDTO {
  @IsNotEmpty()
  @IsString()
  projectTitle!: string;
}
