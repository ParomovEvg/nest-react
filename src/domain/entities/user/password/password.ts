import { compare, hash } from 'bcrypt';
import { PasswordDto } from './password.dto';
import { classToPlain, plainToClass } from 'class-transformer';

export class Password {
  private static saltRounds = 10;
  private readonly id?: number;
  private readonly hashedPassword: string;

  constructor(dto: PasswordDto) {
    this.id = dto.id;
    this.hashedPassword = dto.hashedPassword;
  }

  static async of(passwordString: string) {
    const hashedPassword = await hash(passwordString, Password.saltRounds);
    return new Password({ hashedPassword });
  }

  getHashedPassword() {
    return this.hashedPassword;
  }

  check(passwordString: string): Promise<boolean> {
    return compare(passwordString, this.hashedPassword);
  }

  getDto(): PasswordDto {
    return classToPlain(this) as any;
  }
}
