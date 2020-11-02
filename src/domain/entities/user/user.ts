import { Password } from './password/password';
import { UserDto } from './user.dto';
import { classToPlain } from 'class-transformer';

export class User {
  private readonly name: string;
  private readonly email: string;
  private readonly passwords: Set<Password>;
  private readonly id?: number;

  constructor(userDto: UserDto) {
    this.id = userDto.id;
    this.name = userDto.name;
    this.email = userDto.email;
    this.passwords = new Set<Password>(userDto.passwords?.map(e => new Password(e)));
  }

  static of(name: string, email: string) {
    return new User({
      name,
      email,
    });
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  addPassword(password: Password) {
    this.passwords.add(password);
  }

  getDto(): UserDto {
    return classToPlain(this) as any;
  }
}
