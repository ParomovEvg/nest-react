import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAccountReq {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
