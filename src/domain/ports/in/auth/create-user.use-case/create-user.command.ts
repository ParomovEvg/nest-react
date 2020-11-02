import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserCommand {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
