import { PasswordDto } from './password/password.dto';

export interface UserDto {
  name: string;
  email: string;
  passwords?: PasswordDto[];
  id?: number;
}
