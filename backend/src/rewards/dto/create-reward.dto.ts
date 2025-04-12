import { IsNotEmpty, IsString, IsMongoId } from "class-validator";

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  discount: string;

  @IsMongoId()
  partner: string;
}
