import { CreateUserUseCase } from '../../ports/in/auth/create-user.use-case/create-user.use-case';
import { CreateUserError } from '../../ports/in/auth/create-user.use-case/create-user.error';
import { Either, left, right } from 'useful-monads';
import { CreateUserCommand } from '../../ports/in/auth/create-user.use-case/create-user.command';
import { LoadUserByEmailPort } from '../../ports/out/user/load-user-by-email.port';
import { LoadUserByNamePort } from '../../ports/out/user/load-user-by-name.port';
import { SaveNewUserPort } from '../../ports/out/user/save-new-user.port';
import { Password } from '../../entities/user/password/password';
import { User } from '../../entities/user/user';

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly _loadUserByEmail: LoadUserByEmailPort,
    private readonly _loadUserByName: LoadUserByNamePort,
    private readonly _saveNewUser: SaveNewUserPort,
  ) {}

  async createUser(command: CreateUserCommand): Promise<Either<CreateUserError, void>> {
    const userByEmail = await this._loadUserByEmail.loadUserByEmail(command.email);
    const userByName = await this._loadUserByName.loadUserByName(command.name);

    if (userByEmail.isRight() || userByName.isRight()) {
      return left(new CreateUserError('Пользователь с таким именем или имейлом существует'));
    }

    const newPassword = await Password.of(command.password);
    const newUser = User.of(command.name, command.email);
    newUser.addPassword(newPassword);

    return right(await this._saveNewUser.saveNewUser(newUser));
  }
}
